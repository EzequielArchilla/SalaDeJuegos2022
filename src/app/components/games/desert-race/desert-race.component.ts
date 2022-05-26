import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/class/car/car';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-desert-race',
  templateUrl: './desert-race.component.html',
  styleUrls: ['./desert-race.component.scss'],
})
export class DesertRaceComponent implements OnInit {
  canvas!: HTMLCanvasElement | null;
  ctx!: CanvasRenderingContext2D | null;
  background!: HTMLImageElement;
  autoImage!: HTMLImageElement;
  auto1Image!: HTMLImageElement;
  auto2Image!: HTMLImageElement;
  auto3Image!: HTMLImageElement;
  auto4Image!: HTMLImageElement;
  auto5Image!: HTMLImageElement;
  crash!: number;
  then: number;
  now: number;
  delta: number;
  direccion: string;
  autosEnemigos: Car[] = [];
  imagenesAutosEnemigos: HTMLImageElement[] = [];
  puntaje: number;
  continue: boolean;

  auto = {
    speed: 50, // movement in pixels per second
    x: 0,
    y: 0,
  };

  constructor(
    private router: Router,
    private userFirestore: UserFirestoreService,
    private auth: UserAuthService,
    private toastr: ToastrService
  ) {
    this.continue = true;
    this.puntaje = 0;
    this.direccion = '';
    this.delta = 0;
    this.now = 0;
    this.then = 0;
    this.background = new Image();
    this.background.src = '../../../assets/background-long.png';
    this.autoImage = new Image();
    this.autoImage.src = '../../../assets/autos/player.png';
    this.crash = 0;
  }

  ngOnInit(): void {}

  navigateHome() {
    setTimeout(() => {
      this.router.navigateByUrl('Home');
    }, 1000);
  }

  startCanvas() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = (<HTMLCanvasElement>this.canvas).getContext('2d');
    if (this.ctx) this.ctx.drawImage(this.background, 0, 0);
  }

  move(direccion: string, number: number) {
    if (direccion == 'left' && this.auto.x >= 0) {
      // Player holding left
      this.auto.x -= this.auto.speed * number;
    }
    if (direccion == 'right' && this.auto.x <= 195) {
      // Player holding right
      this.auto.x += this.auto.speed * number;
    }

    this.autosEnemigos.forEach((auto) => {
      auto.y += auto.speed * number;
    });

    this.autosEnemigos.forEach((auto) => {
      if (this.canvas && auto.y >= this.canvas.height) {
        auto.y = -100;
        auto.x = Math.random() * (this.canvas.width - 64);
      }
    });

    // Deteccion de colision
    this.autosEnemigos.forEach((auto) => {
      if (
        this.auto.x <= auto.x + 22 &&
        auto.x <= this.auto.x + 22 &&
        this.auto.y <= auto.y + 22 &&
        auto.y <= this.auto.y + 22
      ) {
        ++this.crash;
        this.continue = false;
      }
    });
  }

  render() {
    if (this.ctx) {
      this.ctx.drawImage(this.background, 0, 0);
      this.ctx.drawImage(this.autoImage, this.auto.x, this.auto.y);

      this.autosEnemigos.forEach((auto) => {
        this.ctx?.drawImage(auto.imgSrc, auto.x, auto.y);
      });
    }
  }

  generacionEnemigos() {
    console.log(this.canvas?.width);
    for (let i = this.autosEnemigos.length; i < this.puntaje / 200; i++) {
      if (this.canvas)
        this.autosEnemigos.push(
          new Car(
            Math.random() * (this.canvas.width - 24),
            -100,
            Math.floor(Math.random() * 5)
          )
        );
    }
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  start() {
    this.continue = true;
    this.puntaje = 0;
    this.autosEnemigos = [];
    this.then = Date.now();
    this.startCanvas();
    this.resetGame();
    this.mainLoop();
  }

  resetGame() {
    if (this.canvas) {
      this.auto.x = this.canvas.width / 2;
      this.auto.y = 480;

      this.autosEnemigos.forEach((auto) => {
        if (this.canvas) auto.x = Math.random() * (this.canvas.width - 64);
        auto.y = 0;
      });
    }
  }

  mainLoop() {
    var now = Date.now();

    var delta = now - this.then;

    this.move(this.direccion, delta / 1000);
    this.render();
    this.generacionEnemigos();

    this.then = now;
    this.puntaje++;

    if (this.continue) {
      requestAnimationFrame(() => this.mainLoop());
    } else {
      if (this.ctx && this.canvas)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.generarPuntaje();
    }
  }

  generarPuntaje() {
    if (this.puntaje > 0) {
      this.userFirestore
        .crearPuntaje(this.auth.userLogged, this.puntaje, 'desertRace')
        .then((ok) => {
          this.toastr.success('Puntaje cargado');
        });
    }
  }
}

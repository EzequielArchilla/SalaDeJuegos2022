import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css'],
})
export class MayorOMenorComponent implements OnInit {
  mazo!: string[];
  cartaActual!: number;
  cartaProxima!: number;
  cartasSacadas!: number;
  mayorOMenor!: string;
  palos = ['e', 'b', 'c', 'o'];
  puntaje!: number;
  puntajeMaximo!: number;
  jugando: boolean = false;

  constructor(
    private router: Router,
    private userFirestore: UserFirestoreService,
    private auth: UserAuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  iniciarMazo() {
    this.jugando = true;
    this.mazo = [];
    this.cartaActual = 0;
    this.cartaProxima = 0;
    this.cartasSacadas = 0;
    this.puntaje = 0;
    this.puntajeMaximo = 0;
    this.palos.forEach((value) => {
      for (let i = 1; i <= 12; i++) {
        this.mazo.push(value + i);
      }
    });
    this.mezclarMazo();
    this.cambiarImagen();
    const h2 = document.getElementById('score');
    h2?.classList.add('hidden');
  }

  mezclarMazo() {
    let posicion1: number;
    let tmp: string;

    for (let i = 0; i <= 47; i++) {
      posicion1 = Math.floor(Math.random() * 47);
      tmp = this.mazo[i];
      this.mazo[i] = this.mazo[posicion1];
      this.mazo[posicion1] = tmp;
    }

    console.log(this.mazo);
  }

  mayor() {
    this.mayorOMenor = 'mayor';
    this.sacarCarta();
  }

  menor() {
    this.mayorOMenor = 'menor';
    this.sacarCarta();
  }

  sacarCarta() {
    if (this.cartasSacadas <= 48) {
      this.cartaActual = parseInt(this.mazo[0].substr(1, 2));
      this.mazo.shift();
      this.cartaProxima = parseInt(this.mazo[0].substr(1, 2));
      this.cambiarImagen();

      if (this.mayorOMenor == 'mayor') {
        if (this.cartaProxima >= this.cartaActual) {
          this.puntaje++;
        } else {
          this.gameOver();
        }
      } else if (this.mayorOMenor == 'menor') {
        if (this.cartaProxima <= this.cartaActual) {
          this.puntaje++;
        } else {
          this.gameOver();
        }
      }
    }
  }

  gameOver() {
    this.puntajeMaximo = this.puntaje;
    this.jugando = false;
    const h2 = document.getElementById('score');
    h2?.classList.remove('hidden');
    this.generarPuntaje();
  }

  generarPuntaje() {
    if (this.puntajeMaximo > 0) {
      this.userFirestore
        .crearPuntaje(this.auth.userLogged, this.puntajeMaximo, 'mayor-menor')
        .then((ok) => {
          this.toastr.success('Puntaje cargado');
        });
    }
  }

  cambiarImagen() {
    const imagen = document.getElementById('imagenes_mazo') as HTMLImageElement;
    imagen.src = '../../../../assets/baraja/' + this.mazo[0] + '.png';
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  navigateHome() {
    setTimeout(() => {
      this.router.navigateByUrl('Home');
    }, 1000);
  }
}

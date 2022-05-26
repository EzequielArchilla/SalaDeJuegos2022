import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit {
  words = [
    'CONSTRUCTOR',
    'PLANETARIO',
    'ELEFANTE',
    'VEHICULO',
    'COMPUTADORA',
    'CARTEL',
    'INSTITUCION',
    'FACULTAD',
    'INDICE',
    'ESTACIONAMIENTO',
    'MULTITUD',
    'INVISIBLE',
    'PARCIAL',
    'TELEVISOR',
    'RECICLAJE',
    'INVESTIGACION',
    'ARMAMENTO',
    'INFLACION',
    'ESTUDIANTE',
    'PERITO',
    'INFLAMABLE',
    'ESCALERA',
    'EDIFICIO',
    'CASA',
    'AUTOMATIZACION',
  ];
  word = '';
  hiddenWord = '';
  tries = 0;
  win = false;
  lost = false;
  puntaje = 0;
  letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  constructor(
    private userFirestore: UserFirestoreService,
    private auth: UserAuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let randomNumber = Math.floor(Math.random() * this.words.length);
    this.word = this.words[randomNumber];
    this.hiddenWord = '_ '.repeat(this.word.length);
  }

  check(letter: string) {
    if (
      (document.getElementById('btn-' + letter) as HTMLInputElement) === null
    ) {
      return true;
    }
    if (
      (document.getElementById('btn-' + letter) as HTMLInputElement)
        .disabled === true
    ) {
      return true;
    }
    (document.getElementById('btn-' + letter) as HTMLInputElement).disabled =
      true;
    if (this.word.indexOf(letter) === -1) {
      this.tries++;
    }
    const hiddenWordArray = this.hiddenWord.split(' ');
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    this.hiddenWord = hiddenWordArray.join(' ');
    this.checkGame();
    return false;
  }

  checkGame() {
    const wordArray = this.hiddenWord.split(' ');
    const wordCheck = wordArray.join('');
    if (wordCheck === this.word) {
      this.win = true;
      this.puntaje++;
    }
    if (this.tries == 10) {
      this.lost = true;
      this.generarPuntaje();
    }
  }

  generarPuntaje() {
    if (this.puntaje > 0) {
      this.userFirestore
        .crearPuntaje(this.auth.userLogged, this.puntaje, 'ahorcado')
        .then((ok) => {
          this.toastr.success('Puntaje cargado');
        });
    }
  }

  reloadGame() {
    let randomNumber = Math.floor(Math.random() * this.words.length);
    this.word = this.words[randomNumber];
    this.hiddenWord = '_ '.repeat(this.word.length);
    this.tries = 0;
    this.puntaje = 0;
    this.win = false;
    this.lost = false;
  }

  onKey(event: KeyboardEvent) {
    this.check(event.key.toUpperCase());
  }

  sendScore() {}
}

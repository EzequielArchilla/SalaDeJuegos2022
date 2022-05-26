import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Survey } from 'src/app/class/survey/survey';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  paisSeleccionado: string = '';
  encuesta: Survey = new Survey();
  encuestaForm: FormGroup;
  juegosFav: string[] = [];
  nombre: string;
  apellido: string;

  constructor(
    private userFirestore: UserFirestoreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: UserAuthService
  ) {
    this.encuestaForm = fb.group({
      edad: ['', [Validators.required, Validators.min(10), Validators.max(99)]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      rating: ['', [Validators.required]],
      juegosFav: ['', [Validators.required]],
      mejoras: ['', [Validators.required]],
    });
    this.nombre = this.auth.userLogged.name;
    this.apellido = this.auth.userLogged.lastName;
  }

  ngOnInit(): void {}

  crearEncuesta() {
    this.encuesta.edad = this.encuestaForm.controls['edad'].value;
    this.encuesta.telefono = this.encuestaForm.controls['telefono'].value;
    this.encuesta.puntaje = this.encuestaForm.controls['rating'].value;
    this.encuesta.juegosFavoritos = this.juegosFav;
    this.encuesta.mejoras = this.encuestaForm.controls['mejoras'].value;

    console.log(this.encuesta);

    this.userFirestore
      .crearEncuesta(this.auth.userLogged, this.encuesta)
      .then(() => {
        this.toastr.success('Encuesta cargada correctamente. GRACIAS!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.toastr.error(error);
        this.router.navigate(['home']);
      });
  }

  juegosFavoritos(juego: string) {
    if (this.juegosFav.find((item) => item === juego) === undefined) {
      this.juegosFav.push(juego);
    } else {
      this.juegosFav = this.juegosFav.filter((item) => item !== juego);
    }
  }

  asignarPuntaje(puntaje: number) {
    this.encuesta.puntaje = puntaje;
  }
}

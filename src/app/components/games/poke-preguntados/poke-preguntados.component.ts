import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiPokemonService } from 'src/app/services/apiPokemon/api-pokemon.service';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-poke-preguntados',
  templateUrl: './poke-preguntados.component.html',
  styleUrls: ['./poke-preguntados.component.css'],
})
export class PokePreguntadosComponent implements OnInit {
  nombresPokemonTodos: string[] = [];
  pokemonNombre: string = '';
  pokemonImagen: string = '';
  nombresPokemonFalsos: string[] = [];
  jugando: boolean = false;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  derrota: boolean = false;

  constructor(
    private pokeApi: ApiPokemonService,
    private toastr: ToastrService,
    private userFirestore: UserFirestoreService,
    private auth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.pokeApi.ObtenerNombres().subscribe((data: any) => {
      data['results'].forEach((element: any) => {
        this.nombresPokemonTodos.push(element.name);
      });
    });
  }

  nuevoPokemon() {
    this.derrota = false;
    this.pokeApi.ObtenerPokemon().subscribe((data: any) => {
      this.nombresPokemonFalsos = [];
      this.pokemonNombre = data['name'];
      this.pokemonImagen = data['sprites'].front_default;

      this.nombresPokemonFalsos.push(this.pokemonNombre);
      for (let i = 0; i < 3; i++) {
        this.nombresPokemonFalsos.push(
          this.nombresPokemonTodos[
            Math.floor(Math.random() * (150 - 1 + 1) + 1)
          ]
        );
      }
    });
    this.jugando = true;
  }

  check(nombreSeleccionado: string) {
    if (nombreSeleccionado == this.pokemonNombre) {
      this.rondaGanada();
    } else {
      this.rondaPerdida();
    }
  }

  rondaPerdida() {
    this.showError();
    this.derrota = true;
    this.nombresPokemonFalsos = [];
    this.pokemonImagen = '';
    this.jugando = false;
    this.puntajeFinal = this.puntaje;
    this.puntaje = 0;
    this.generarPuntaje();
  }

  rondaGanada() {
    this.puntaje++;
    this.nuevoPokemon();
  }

  showSuccess() {
    this.toastr.success('Correcto');
  }

  showError() {
    this.toastr.error('Incorrecto');
  }

  generarPuntaje() {
    console.log(this.auth.userLogged);
    if (this.puntajeFinal > 0) {
      this.userFirestore
        .crearPuntaje(
          this.auth.userLogged,
          this.puntajeFinal,
          'poke-preguntados'
        )
        .then((ok) => {
          this.toastr.success('Puntaje cargado');
        });
    }
  }
}

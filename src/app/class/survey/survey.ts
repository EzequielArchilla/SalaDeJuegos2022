import { User } from '../user';

export class Survey {
  edad: number;
  telefono: string;
  puntaje: number;
  juegosFavoritos: string[];
  mejoras: string;

  constructor() {
    this.edad = 0;
    this.telefono = '';
    this.puntaje = 0;
    this.juegosFavoritos = [];
    this.mejoras = '';
  }
}

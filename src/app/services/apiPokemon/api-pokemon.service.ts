import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiPokemonService {
  constructor(private http: HttpClient) {}

  public ObtenerPokemon() {
    return this.http.get(
      'https://pokeapi.co/api/v2/pokemon/' +
        Math.floor(Math.random() * (150 - 1 + 1) + 1)
    );
  }

  public ObtenerNombres() {
    return this.http.get(
      'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0'
    );
  }
}

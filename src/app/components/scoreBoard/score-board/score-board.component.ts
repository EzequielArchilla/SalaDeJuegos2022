import { Component, Input, OnInit } from '@angular/core';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
})
export class ScoreBoardComponent implements OnInit {
  @Input() juegoSeleccionado: string = '';
  listaPuntajes: any[] = [];

  constructor(private userFirestore: UserFirestoreService) {
    this.userFirestore.obtenerPuntajes().subscribe((data) => {
      this.listaPuntajes = data
        .filter((item) => item.juego == this.juegoSeleccionado)
        .sort((a, b) => b.puntaje - a.puntaje);
    });
  }

  ngOnInit(): void {}
}

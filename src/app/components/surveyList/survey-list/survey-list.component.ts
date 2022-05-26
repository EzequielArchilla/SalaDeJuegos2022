import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/class/survey/survey';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  listaEncuestas: any[] = [];

  constructor(private userFirestore: UserFirestoreService) {
    this.userFirestore.obtenerEncuesta().subscribe((data) => {
      this.listaEncuestas = data;
    });
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigateUrl(url: string) {
    this.router.navigate([url]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userLogged: User = new User();

  constructor(private router: Router, private userAuth: UserAuthService) {
    this.userLogged = this.userAuth.userLogged;
  }

  ngOnInit(): void {}

  navigateUrl(url: string) {
    this.router.navigate([url]);
  }
}

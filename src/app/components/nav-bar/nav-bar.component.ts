import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  logged: boolean;
  email: string;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
    this.logged = false;
    this.email = '';
  }

  ngOnInit(): void {
    // const loggedObservable = this.userAuthService.getLoggedObservable();
    // loggedObservable.subscribe((result)=>
    // {
    //   console.log("ENTER");
    //   console.log(result);
    // })
    this.userAuthService.loggedChange.subscribe((value) => {
      this.logged = value;
      this.email = this.userAuthService.userLogged.email;
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  signOut() {
    this.userAuthService.signOut();
    this.userAuthService.setLogged(false);
    this.localStorageService.removeData('userEmail');
    this.router.navigate(['home']);
  }
}

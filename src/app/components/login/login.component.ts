import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/class/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;
  password: string;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userFire: UserFirestoreService,
    private userAuthService: UserAuthService,
    private localStorageService: LocalStorageService
  ) {
    this.user = new User();
    this.password = "";
  }

  ngOnInit(): void {}

  fastLogIn() {
    this.user.email = 'ingresorapido@test.com';
    this.password = '123456';
  }

  showSuccess() {
    this.toastr.success('Ingreso correcto!');
  }

  showError(error: string) {
    this.toastr.error('Error: ' + error);
  }

  logIn() {
    this.userAuthService
      .signIn(this.user.email, this.password)
      .then((userCredential) => {
        this.userFire.crearIngreso(this.user).then((result) => {
          this.userAuthService.userLogged = this.user;
          this.userAuthService.setLogged(true);
          this.localStorageService.setData("userEmail",this.user.email);
          this.showSuccess();
          setTimeout(() => {
            this.router.navigateByUrl('home');
          }, 1000);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.showError(errorMessage);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/class/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserFirestoreService } from 'src/app/services/user-firestore/user-firestore.service';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User;
  password: string;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userAuthService: UserAuthService,
    private userFire: UserFirestoreService,
    private localStorageService: LocalStorageService
  ) {
    this.user = new User();
    this.password = "";
  }

  ngOnInit(): void {}

  showSuccess() {
    this.toastr.success('Registrado correcto!');
  }

  showError(error: string) {
    this.toastr.error('Error: ' + error);
  }

  signUp() {
    this.userAuthService
      .signUp(this.user.email, this.password)
      .then((userCredential) => {
        this.userFire.crearUsuario(this.user);
        this.userAuthService.userLogged = this.user;
        this.userAuthService.setLogged(true);
        this.localStorageService.setData('userEmail', this.user.email);
        this.showSuccess();
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.showError(errorMessage);
      });
  }
}

import { Injectable } from '@angular/core';
import { User } from 'src/app/class/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  userLogged: User;
  logged: boolean;
  loggedChange: Subject<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService
  ) {
    this.userLogged = new User();
    this.logged = false;
    this.loggedChange = new Subject<boolean>();

    this.loggedChange.subscribe((value) => {
      this.logged = value;
    });
  }

  public signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public signOut() {
    return this.afAuth.signOut();
  }

  setLogged(input: boolean) {
    this.loggedChange.next(input);
  }
}

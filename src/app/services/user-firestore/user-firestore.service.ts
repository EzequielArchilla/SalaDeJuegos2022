import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/class/user';

@Injectable({
  providedIn: 'root',
})
export class UserFirestoreService {
  private ingresosRef: AngularFirestoreCollection;
  private usuariosRef: AngularFirestoreCollection;
  private puntajesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.ingresosRef = this.db.collection('ingresos');
    this.usuariosRef = this.db.collection('usuarios');
    this.puntajesRef = this.db.collection('puntajes');
  }

  public crearIngreso(user: User) {
    var today = new Date();
    return this.ingresosRef.add({ email: user.email, fecha: today });
  }

  public crearPuntaje(user: User, puntaje: number) {
    var today = new Date();
    return this.puntajesRef.add({
      email: user.email,
      fecha: today,
      puntaje: puntaje,
    });
  }

  public crearUsuario(user: User) {
    return this.usuariosRef.add({ ...user });
  }

  public obtenerIngreso() {
    return this.ingresosRef.valueChanges() as Observable<User[]>;
  }

  public update(id: string, data: any) {
    return this.ingresosRef.doc(id).update(data);
  }

  public delete(id: string) {
    return this.ingresosRef.doc(id).delete();
  }

  // public obtenerColeccionIngresos() {
  //   return this.userRef.snapshotChanges().pipe(
  //     map(actions => actions.map((a: any) => {
  //       const data = a.payload.doc.data() as Usuario;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     })));
  // }

  // public cambiarValidado(uid: string, validado: boolean) {
  //   if (validado == true) {
  //     return this.userRef.doc(uid).update({
  //       validado: false
  //     });
  //   } else {
  //     return this.userRef.doc(uid).update({
  //       validado: true
  //     });
  //   }
  // }

  // public obtenerSnapshot() {
  //   return this.usuariosRef.snapshotChanges();
  // }
}

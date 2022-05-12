import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, where, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';

const firebaseApp = initializeApp(environment.firebaseConfig);
const db = getFirestore();
const auth = getAuth();

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  message: string;
  uid: string;
  messages: any[] = [];

  constructor(private router: Router,
    private userService:UserAuthService) {
    this.message = "";
    this.uid = "";
    this.chat();
  }

  ngOnInit(): void {
  }

  async chat() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const col = query(collection(db, "messages"), orderBy("order", "desc"), limit(8))
        const unsubscribe = onSnapshot(col, (querySnapshot) => {
          this.messages = [];
          querySnapshot.forEach((doc) => {
            this.messages.push(doc.data());
          });
          this.messages.reverse();
        });
        this.uid = user.uid;
      } else {
        console.log("NOT LOGGED IN");
        // User is signed out
        // ...
      }
    })
  }

  view() {
    console.log(this.messages);
  }


  async writeMessage() {
    if (this.message != "") {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      try {
        const docRef = await addDoc(collection(db, "messages"), {
          owner: this.userService.userLogged.name + " " + this.userService.userLogged.lastName,
          message: this.message,
          date: date + ' ' + time,
          uid: this.uid,
          order: Date.now()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.message = "";
    }
  }

  // async traerDatos() {
  //   const querySnapshot = await getDocs(collection(db, "messages"));
  //   querySnapshot.forEach((doc) => {
  //     this.messages.push(doc.data().message);
  //   });
  // }

  navigateHome() {
    this.router.navigateByUrl("home");
  }

}



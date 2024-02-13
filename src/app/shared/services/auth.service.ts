import { Injectable } from "@angular/core";
// import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
// import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
// import { UserService } from "./user.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// import * as firebase from 'firebase';
@Injectable({
  providedIn: "root",
})
export class AuthService {
  displayName: string;
  password: string;
  user$: Observable<any>;
  constructor(
    private firebaseAuth: AngularFireAuth,
    // private userService: UserService,
    private router: Router,
    // private db: AngularFireDatabase
  ) {
    this.user$ = firebaseAuth.authState;
  }

  // get appUser$(): Observable<any> {
  //   return this.user$.pipe(
  //     switchMap((user) => {
  //       if (user) {
  //         return this.userService.get(user.uid);
  //       } else {
  //         // Logged out

  //         return of(null);
  //       }
  //     })
  //   );
  // }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  deleteOneUser(email: string, password: string) { }
}

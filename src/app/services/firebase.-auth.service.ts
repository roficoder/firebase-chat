import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';

import { Router } from '@angular/router';
import { RoutingService } from './routing.service';
import { AlertService } from './alert.service';
import { UserDTO } from '../shared/models/user.dto';
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private firebaseService: FirebaseService, // Inject Firebase service
    private router: Router, // Inject Route Service
    private ngZone: NgZone, // NgZone service to remove outside scope warning
    private routing: RoutingService, // Routing service to route pages
    private alertService: AlertService // Alert service to display alert
  ) {
  }
  // Send email verification when new user sign up

  insertUser: UserDTO = new UserDTO()
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user: any) => {
        return user.sendEmailVerification();
      })
      .then((respnse) => {
        this.routing.goToLogin()
        // this.router.navigate(['verify-email-address']);
      });
  }
  // Sign up with email/password
  async SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use')
          this.alertService.showAlert("Email already exists", 'error')
        if (error.code == 'auth/weak-password')
          this.alertService.showAlert("Password field contain more than 6 character", 'error')
      });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        if (result.user.emailVerified !== true) {
          this.alertService.validateEmail(result.user.displayName);
          this.SendVerificationMail();
        } else {
          this.ngZone.run(() => {
            this.routing.goToChat()
            // this.router.navigate(['<!-- enter your route name here -->']);
          });
        }
      }).catch(error => {
        if (error.code == 'auth/user-not-found')
          this.alertService.showAlert("User Not Found", 'error')
        else if (error.code == 'auth/missing-email')
          this.alertService.showAlert("Please enter email", 'error')
        else if (error.code == 'auth/wrong-password')
          this.alertService.showAlert("Wrong password", 'error')
        else if (error.code) this.alertService.showAlert(error.code, 'error')
        else this.alertService.showAlert("Some thing went wrong", 'error')

        // this.alertService.showAlert("Email Or Password is Incorrect", 'error');

      })

  }

  getlogedinUser() {
    return this.afAuth.authState
  }

  saveUser(user: any) {
    this.insertUser.displayName = user.displayName;
    this.insertUser.email = user.email;
    this.insertUser.emailVerified = user.emailVerified;
    this.insertUser.photoURL = user.photoURL;
    this.insertUser.uid = user.uid;
    this.firebaseService.saveUser(this.insertUser)

  }



  logout() {
    return this.afAuth.signOut()
  }


  async SignInWithGoogle() {
    return this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        this.saveUser(result.user)
        this.routing.goToChat();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Sign in with Facebook

  SignInWithFacebook() {
    return this.afAuth
      .signInWithPopup(new FacebookAuthProvider())
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
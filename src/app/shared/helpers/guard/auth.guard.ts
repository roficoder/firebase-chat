import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RoutingService } from 'src/app/services/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private routing: RoutingService,) {

  }

  canActivate() {
    return this.afAuth.authState.pipe(
      take(1), // Take only one emission and complete the observable
      map((user) => {
        if (user) {
          // User is logged in, allow access to the route
          return true;
        } else {
          // User is not logged in, redirect to the login page
          // this.routing.goToLogin()
          return false;
        }
      })
    );
  }

}

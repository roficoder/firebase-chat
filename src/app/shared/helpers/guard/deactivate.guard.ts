import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RoutingService } from 'src/app/services/routing.service';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(private afAuth: AngularFireAuth, private routing: RoutingService,) {
  }
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), // Take only one emission and complete the observable
      map((user) => {
        if (user) {
          // User is logged in, allow access to the route
          return true;
        } else {
          // User is not logged in, redirect to the login page
          this.routing.goToLogin()
          return false;
        }
      })
    );
  }
  // return component.canDeactivate ? component.canDeactivate() : true;
}



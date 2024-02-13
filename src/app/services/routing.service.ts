import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Path } from '../shared/helpers/enum';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) { }

  back(): void {
    this.location.back();
  }

  goToLogin(replaceUrl: boolean = false) {
    if (replaceUrl) {
      this.dialog.closeAll();
    }
    this.route(Path.public+'/'+Path.login, replaceUrl);
  }

  goToSignUP(replaceUrl: boolean = false) {
    if (replaceUrl) {
      this.dialog.closeAll();
    }
    this.route(Path.public+'/'+Path.signUp, replaceUrl);
  }

  goToChat(replaceUrl: boolean = false) {
    if (replaceUrl) {
      this.dialog.closeAll();
    }
    this.route(Path.private+'/'+Path.chat, replaceUrl);
  }

  goToProfile(replaceUrl: boolean = false) {
    if (replaceUrl) {
      this.dialog.closeAll();
    }
    this.route(Path.profile, replaceUrl);
  }

  // goToForgetPassword() {
  //   this.route(Path.forget);
  // }

  // goToDashboard(replaceUrl: boolean = false) {
  //   this.route(Path.dashboard, replaceUrl);
  // }




  route(path: string, replaceUrl: boolean = false, data?: any) {
    if (!data) {
      this.router.navigate([path], { replaceUrl: replaceUrl });
    } else {
      this.router.navigate([path], {
        replaceUrl: replaceUrl,
        queryParams: data,
      });
    }
  }

}

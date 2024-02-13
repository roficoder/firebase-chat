import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { StorageKeys } from '../shared/helpers/enum';
import { UserDTO } from '../shared/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private routing: RoutingService) { }

  getProperty(key: any) {
    let val: any = window.localStorage.getItem(key);
    if (val != 'undefined') {
      return JSON.parse(val);
    } else {
      return val;
    }
  }

  setProperty(key: any, value: any, parse = true) {
    if (parse) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.setItem(key, value);
    }
  }

  removeProperty(key: any) {
    window.localStorage.removeItem(key);
    return true;
  }

  removeAllProperties() {
    window.localStorage.clear();
    return true;
  }

  setToken(token: string) {
    this.setProperty(StorageKeys.token, token);
  }

  setUser(user: any) {
    delete user.password;
    this.setProperty(StorageKeys.user, user);
  }

  get token() {
    let token: any = this.getProperty(StorageKeys.token);
    if (token) return token;
    return null;
  }

  get user(): UserDTO | undefined {
    let user: any = this.getProperty(StorageKeys.user);
    if (user) return user;
    return undefined;
  }

  // get isSuperadmin(): boolean {
  //   if (this.user) {
  //     return this.user._id == '1655470612967' && this.user.type == 'admin';
  //   } else {
  //     return false;
  //   }
  // }

  logout() {
    this.removeAllProperties();
    // this.routing.goToLogin(true);
  }
}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delay,
  map,
  timer,
} from 'rxjs';
import {
  BroadcasterKeys,
  Languages,
  StorageKeys,
  ThemesColor,
} from '../helpers/enum';
import { User } from '../helpers/models/user.dto';
import { Broadcaster } from '../helpers/providers/broadcaster';
import { RoutingService } from './routing.service';
import { AlertService } from './alert.service';
import Swal from 'sweetalert2';
import { GlobalTranslateService } from './globaltranslate.service';
import { SignUpDto } from '../helpers/models/insert-sign-up.dto';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  token: string = '';
  firebaseToken: string = '';
  user: User | any = new User();
  configs: any[] = [];
  visitorId: any;
  colorScheme: any;
  changeLanguage: BehaviorSubject<string> = new BehaviorSubject('');
  userId: any;

  autoLogoutTime: number = 1.8e6; //in milisecound
  // autoLogoutTime: number = 5000;  //in milisecound
  timerSubscription: Subscription = new Subscription();

  user_for_UAE_Pass_SignUP: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private broadcaster: Broadcaster,
    private translator: TranslateService,
    private routing: RoutingService,
    private translateService: GlobalTranslateService,

  ) {
    // this.setAppLanguage(Languages.english)
  }

  setAppLanguage(lang: Languages) {
    this.setProperty(StorageKeys.selectedLang, lang);
    this.changeLanguage.next(lang);
    this.translator.setDefaultLang(lang);
    this.translator.use(lang);
    this.broadcaster.broadcast(BroadcasterKeys.adjustLanguage);
  }

  setThemeColor(color: string) {
    this.setProperty(StorageKeys.themesColor, color);
  }

  get ThemeColor() {
    let data = this.getProperty(StorageKeys.themesColor);
    if (data) {
      return data;
    } else {
      return ThemesColor.third;
    }
  }

  getProperty(key: string) {
    const val = window.localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return val;
  }

  setProperty(key: string, value: any, parse = true) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeAllProperties() {
    this.setToken('');
    this.user = new User();

    window.localStorage.clear();
    return true;
  }

  isAuthenticated() {
    return this.getToken() ? true : false;
  }

  setToken(token: string) {
    this.token = '';
    this.token = token;
    this.removeProperty(StorageKeys.token);
    this.setProperty(StorageKeys.token, this.token);
  }

  removeProperty(key: string) {
    window.localStorage.removeItem(key);
    return true;
  }

  getToken(): string {
    this.token = '';
    this.token = this.getProperty(StorageKeys.token);
    if (!this.token) {
      this.token = '';
    }
    return this.token;
  }

  getUser() {
    this.user = new User();
    if (this.getProperty(StorageKeys.user) != null) {
      this.user = Object.assign(this.user, this.getProperty(StorageKeys.user));
    }
    return this.user;
  }

  setUser(user: User | any) {
    if (!this.user) {
      this.user = new User();
    }
    this.user = Object.assign(this.user, user);
    this.setProperty(StorageKeys.user, this.user);
    this.setAutoLogout();
  }

  getConfigs() {
    let configs = this.getProperty(StorageKeys.configs);
    if (configs != null) {
      this.configs = configs;
    }
    return this.configs;
  }

  setConfigs(configs: any[]) {
    this.configs = configs;
    this.setProperty(StorageKeys.configs, this.configs);
  }

  getVisitorId() {
    this.visitorId = this.getProperty(StorageKeys.visitorId);
    if (!this.visitorId) {
      this.visitorId = '';
    }
    return this.visitorId;
  }

  setVisitorId(visitorId: String) {
    this.setProperty(StorageKeys.visitorId, visitorId);
  }

  get Language(): Languages {
    var data = this.getProperty(StorageKeys.selectedLang);
    if (data) {
      return data as Languages;
    } else {
      return Languages.english;
    }
  }

  get HtmlDirection(): any {
    var lang = this.Language;
    if (lang == Languages.english) {
      return 'ltr';
    } else {
      return 'rtl';
    }
  }

  setAutoLogout() {
    this.timerSubscription.unsubscribe();
    if (this.isAuthenticated()) {

      this.timerSubscription = timer(this.autoLogoutTime)
        .pipe(
          map(() => {
            this.removeAllProperties();
            this.routing.goToLogin();
            Swal.fire({
              title: this.translateService.getTranslation('session-expired'),
              text: '',
              icon: 'info',
              confirmButtonText: this.Language == Languages.english ? 'OK' : 'تم',
            });
          })
        )
        .subscribe();
    }
  }

  getColorScheme() {
    this.colorScheme = '';
    if (this.getProperty(StorageKeys.colorScheme) != null) {
      this.colorScheme = Object.assign(
        this.colorScheme,
        this.getProperty(StorageKeys.colorScheme)
      );
    }
    return this.colorScheme;
  }

  setColorScheme(colorScheme: any) {
    if (!this.colorScheme) {
      this.colorScheme = '';
    }
    this.colorScheme = Object.assign(this.colorScheme, colorScheme);
    this.setProperty(StorageKeys.colorScheme, this.colorScheme);
  }
}

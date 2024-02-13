import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebase.-auth.service';
import { UserDTO } from './shared/models/user.dto';
import { RoutingService } from './services/routing.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private firebaseAuthService: FirebaseAuthService, ) {
    this.checkFirebaseAuthState()
  }

  showScreen: boolean = false;
  user: UserDTO = new UserDTO();

  checkFirebaseAuthState() {
    this.firebaseAuthService.getlogedinUser().subscribe((response: any) => {
      if (response) {
        this.user.displayName = response.displayName;
        this.user.photoURL = response.photoURL;
        this.user.email = response.email;
      }
      this.showScreen = true;
    })
  }


  title = 'af-notification';
  message:any = null;
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

}

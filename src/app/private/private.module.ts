import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { FirebaseAuthService } from '../services/firebase.-auth.service';
import { RoutingService } from '../services/routing.service';


@NgModule({
  declarations: [
    ChatComponent,
    FriendListComponent,
    MainComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule {
  constructor(private firebaseAuthService: FirebaseAuthService, private routing: RoutingService,) {
    this.checkFirebaseAuthState()
  }

  checkFirebaseAuthState() {
    this.firebaseAuthService.getlogedinUser().subscribe((response: any) => {
      if (!response) this.routing.goToLogin()
    })
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

//angular material 
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { FirebaseAuthService } from '../services/firebase.-auth.service';
import { RoutingService } from '../services/routing.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PublicRoutingModule
  ]
})
export class PublicModule {


}

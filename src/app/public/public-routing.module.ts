import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from '../shared/helpers/enum';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../shared/helpers/guard/auth.guard';
import { FirebaseAuthService } from '../services/firebase.-auth.service';
import { RoutingService } from '../services/routing.service';

const routes: Routes = [
  { path: '', redirectTo: Path.login, pathMatch: 'full' },
  { path: Path.login, component: LoginComponent},
  { path: Path.signUp, component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {

 }

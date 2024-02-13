import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseAuthService } from 'src/app/services/firebase.-auth.service';
import { RoutingService } from 'src/app/services/routing.service';
import { LoginDTO } from 'src/app/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private routing: RoutingService, private firebaseAuthService: FirebaseAuthService, private alertService: AlertService) { }


  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  insertLogin: LoginDTO = new LoginDTO()

  ngOnInit(): void {
    this.checkFirebaseAuthState()
  }


  checkFirebaseAuthState() {
    this.firebaseAuthService.getlogedinUser().subscribe((response: any) => {
      if (response) this.routing.goToChat()

    })
  }

  gotoSignUP() {
    this.routing.goToSignUP()
  }

  loginWithGoogle() {
    this.firebaseAuthService.SignInWithGoogle()
  }

  submit() {
    this.firebaseAuthService.SignIn(this.insertLogin.email, this.insertLogin.password)
    // .then(response => {
    //   console.log(response);

    // }).catch(err => {
    //   console.log(err);

    // })
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();



}

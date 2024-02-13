import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase.-auth.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SignUPDTO } from 'src/app/shared/models/sign-up.model ';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private routing: RoutingService, private firebaseAuthService: FirebaseAuthService) { }



  ngOnInit(): void {
    this.checkFirebaseAuthState()
  }

  checkFirebaseAuthState() {
    this.firebaseAuthService.getlogedinUser().subscribe((response: any) => {
      if (response) this.routing.goToChat()
       
    })
  }



  insertSignUp: SignUPDTO = new SignUPDTO()

  submit() {
    this.firebaseAuthService.SignUp(this.insertSignUp.email,this.insertSignUp.password).then(response=>{
      console.log(response);
      
        // this.routing.goToLogin()
    }).catch(err=>{
      console.log(err);
      
    })
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }


  gotoLogin(){
    this.routing.goToLogin()
  }

}

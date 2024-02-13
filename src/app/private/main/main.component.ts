import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase.-auth.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private firebaseAuthService: FirebaseAuthService,) { }
  user: UserDTO = new UserDTO();

  ngOnInit(): void {
    this.getCurentUser()
  }

  getCurentUser() {
    this.firebaseAuthService.getlogedinUser().subscribe((response: any) => {
      if (response) {
        this.user.uid = response.uid;
        this.user.displayName = response.displayName
        this.user.photoURL = response.photoURL
      }
    })
  }

}

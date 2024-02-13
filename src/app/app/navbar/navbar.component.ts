import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase.-auth.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private routing: RoutingService, private firebaseAuthService: FirebaseAuthService,) { }
  @Input() user: UserDTO = new UserDTO();
  ngOnInit(): void {
  }

  gotoLogin() {
    this.routing.goToLogin()
  }

  logout() {
    this.firebaseAuthService.logout().then((response: any) => {
      this.user.email = ''
      this.gotoLogin()
    })
  }

}

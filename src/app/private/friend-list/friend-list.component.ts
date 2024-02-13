import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  @Input() user: UserDTO = new UserDTO();

  value: string;
  options: string[] = ['One', 'Two', 'Three'];
  allUsers: any[];
  chatList: any[];

  ngOnInit(): void {
    setTimeout(() => {
      this.getUsersChatList();
    }, 300);
    this.getALLUsers();
  }

  getALLUsers() {
    this.firebaseService.getAllUsers().subscribe(response => {
      this.allUsers = response.filter(item => item.uid != this.user.uid);
    })
  }

  getUsersChatList() {
    if (this.user.uid) {
      this.firebaseService.getUsersChatList(this.user.uid).subscribe(response => {
        this.chatList = response;
      })
    }
  }


  setToChatList(uid: string, photoURL: string) {
    let data = {
      userIds: [uid, this.user.uid],
      user: [{
        displayName: this.value,
        photoURL: photoURL,
        uid: uid
      },
      {
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        uid: this.user.uid
      },
      ]
    }
    this.firebaseService.setUserToUsersChatList(data);
    this.value = '';
  }

  showChat: boolean = false
  chatWith: any
  chat(item: any) {
    this.showChat = true;
    this.chatWith = item
  }
}

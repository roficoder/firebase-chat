import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatWith: UserDTO = new UserDTO();
  @Input() currentUser: UserDTO = new UserDTO();
  message: string;
  @ViewChild('lastMessage') lastMessage: ElementRef;
  constructor(private firebaseService: FirebaseService) { }
  chatMessages: any[]
  ngOnInit(): void {
    this.getChatmessages();
  }

  getChatmessages() {
    this.firebaseService.getMessages(this.chatWith._id).subscribe(response => {
      this.chatMessages = response;
      setTimeout(() => {
        this.scrollToLastMessage()
      }, 500);
    })
  }

  sendMessage(event?: any) {
    if (!event || event.key === 'Enter') {
      console.log("call function");
      let data = {
        text: this.message,
        senderId: this.currentUser.uid,
      }

      this.firebaseService.sentMessage(this.chatWith._id, data)


      this.message = '';
      setTimeout(() => {
        this.scrollToLastMessage()
      }, 500);
    }
  }


  scrollToLastMessage() {
    let lastMessage = document.getElementsByClassName('lastMessage')[0];
    lastMessage.scrollIntoView({ behavior: 'smooth' });
  }


}

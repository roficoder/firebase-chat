import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class FirebaseService {
  firebaseConfig = {
    apiKey: "AIzaSyABiKprOLEykUt6AHOVrlz5_ScOjFxbhT8",
    authDomain: "chat-app-8bec4.firebaseapp.com",
    projectId: "chat-app-8bec4",
    storageBucket: "chat-app-8bec4.appspot.com",
    messagingSenderId: "585658096812",
    appId: "1:585658096812:web:c840398a76324dc3dc5309",
    measurementId: "G-Q5JH780KN8"
  };

  constructor(
    public afStore: AngularFirestore, // Inject Firebase Store service

  ) { }

  async initialize() {
    await initializeApp(this.firebaseConfig);
  }

  async upload(file: any) {
    return new Promise(async (resolve, reject) => {
      const name = new Date().getTime().toString() + file.name;
      const storage = getStorage();
      const storageRef = ref(storage, name);
      const metadata = {
        contentType: file.type,
      };
      uploadBytes(storageRef, file, metadata).then(async (res) => {
        var obj: any = {
          file: {
            mimetype: file.type,
            originalname: file.name,
            fileName: name,
            size: file.size,
          },
        };
        obj.url = await getDownloadURL(res.ref);
        resolve(obj);
      });
    });
  }

  getAllUsers() {
    return this.afStore.collection('user').snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as any;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        })
      )
    );
  }

  saveUser(user: any) {
    this.afStore.collection('user').doc(user.uid).set({
      ...user, timestampField: Timestamp.now(), // Timestamp field})
    })
  }

  // =================== Chat =====================
  getUsersChatList(uid: any) {
    return this.afStore.collection('chats', (ref) => ref.where("userIds", "array-contains", uid))
      .snapshotChanges().pipe(
        map((actions) =>
          actions.map((action) => {
            let data = action.payload.doc.data() as any;
            const _id = action.payload.doc.id;
            delete data.userIds;
            data.user.splice(data.user.findIndex((item: any) => item.uid == uid), 1);
            data.user = data.user[0];
            return { _id,lastMessage:data.lastMessage, ...data.user };
          })
        )
      );
  }

  setUserToUsersChatList(data: any) {
    return this.afStore.collection('chats').add(data)
  }



  // =================== Messages =====================
  sentMessage(chatId: any, data: any) {
    data.sendDate=Timestamp.now();
    this.afStore.collection('chats').doc(chatId).update({lastMessage:Timestamp.now()})
    return this.afStore.collection('chats').doc(chatId).collection('message').add(data);
    // .snapshotChanges().pipe(
    //   map((actions) =>
    //     actions.map((action) => {
    //       let data = action.payload.doc.data() as any;
    //       const _id = action.payload.doc.id;
    //       delete data.userIds;
    //       data.user.splice(data.user.findIndex((item: any) => item.uid == uid), 1);
    //       data.user = data.user[0]
    //       return { _id, ...data.user };
    //     })
    //   )
    // );
  }

  getMessages(chatId:any) {
    return this.afStore.collection('chats').doc(chatId).collection('message',(ref) => ref.orderBy("sendDate", "asc")) 
    .snapshotChanges().pipe(
        map((actions) =>
          actions.map((action) => {
            const data = action.payload.doc.data() as any;
            const _id = action.payload.doc.id;
            
            return { _id, ...data };
          })
        )
      );
  }


}

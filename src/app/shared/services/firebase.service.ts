import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: 'AIzaSyATdPhNg--ZhN7f0AkMtrPknO0hQB_phwU',
    authDomain: 'fujairah-dummy.firebaseapp.com',
    projectId: 'fujairah-dummy',
    storageBucket: 'fujairah-dummy.appspot.com',
    messagingSenderId: '92279824424',
    appId: '1:92279824424:web:cd6b5b77d8cb0c1101951d',
  };

  constructor() {}

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
}

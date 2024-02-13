importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyABiKprOLEykUt6AHOVrlz5_ScOjFxbhT8",
    authDomain: "chat-app-8bec4.firebaseapp.com",
    projectId: "chat-app-8bec4",
    storageBucket: "chat-app-8bec4.appspot.com",
    messagingSenderId: "585658096812",
    appId: "1:585658096812:web:c840398a76324dc3dc5309",
    measurementId: "G-Q5JH780KN8"
});
const messaging = firebase.messaging();
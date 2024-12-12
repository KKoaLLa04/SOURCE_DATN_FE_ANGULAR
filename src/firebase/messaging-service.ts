import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  messaging;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyA0f72LUkQv653RDF1cvggtvp8YspZqGrM",
      authDomain: "manager-96391.firebaseapp.com",
      projectId: "manager-96391",
      storageBucket: "manager-96391.firebasestorage.app",
      messagingSenderId: "631701701097",
      appId: "1:631701701097:web:2a1eeaa2bf4f0805378b78",
      measurementId: "G-G9YRH454XD"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Messaging
    this.messaging = getMessaging(app);
  }

  requestPermission() {
    getToken(this.messaging, { vapidKey: 'BP9UCYeiBdTpKpN_HKL9iH7QQRmdvzE6jG8wn7nXXHqs8KqGFByqjHF3K9ijKi3gFTuYkbLvhUr0d9t-emdOPdI' }).then(
      (token) => {
        console.log('FCM Token:', token);
      },
      (err) => {
        console.log('Unable to get permission for notification', err);
      }
    );
  }

  receiveMessaging() {
    onMessage(this.messaging, (payload) => {
      console.log('New message received', payload);
      this.currentMessage.next(payload);
    });
  }
}

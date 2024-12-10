import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private afMessaging: AngularFireMessaging) {}

  // Yêu cầu quyền thông báo
  requestPermission() {
    this.afMessaging.requestPermission
      .toPromise()
      .then(() => {
        console.log('Permission granted!');
        this.getToken();
      })
      .catch((err) => {
        console.error('Permission denied', err);
      });
  }

  // Lấy token FCM
  getToken() {
    this.afMessaging.getToken
      .pipe()
      .toPromise()
      .then((token) => {
        console.log('FCM Token:', token);
        // Lưu token vào backend để gửi thông báo
      })
      .catch((err) => {
        console.error('Error getting token', err);
      });
  }

  // Lắng nghe các thông báo
  listenForMessages() {
    this.afMessaging.messages
      .subscribe((payload) => {
        console.log('New message received. ', payload);
        this.currentMessage.next(payload);
      });
  }
}

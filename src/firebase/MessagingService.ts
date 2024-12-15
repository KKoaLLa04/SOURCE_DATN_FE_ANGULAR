import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";

@Injectable()
export class MessagingNewService{
  constructor(private angularFirebaseMessaging: AngularFireMessaging){

  }

  requestPerm(userName){
    this.angularFirebaseMessaging.requestToken.subscribe((token) => {
      console.log(token);
    }, (err) => {
      console.log(err);
    })
  }
}

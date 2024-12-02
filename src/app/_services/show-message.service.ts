import { Injectable } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private notification: NzNotificationService) { }

  success(content: string = '', nzDuration = 3000, title: string = translate('success')) {
    this.notification.success(title, content, { nzDuration: nzDuration, nzClass: 'so-notification so-notification-success' });
  }

  error(content: string = '', nzDuration = 3000, title: string = translate('errorUppercase')) {
    this.notification.create('error', title, content, { nzDuration: nzDuration, nzClass: 'so-notification so-notification-err' });
  }

  warning(content: string = '',nzDuration = 3000, title: string = translate('warning')) {
    this.notification.create('warning', title, content, { nzDuration: nzDuration, nzClass: 'so-notification so-notification-warming' });
  }
}



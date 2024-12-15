import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { GeneralService } from 'src/app/_services/general.service';
import { LayoutService } from '../../core/layout.service';
import { UserInnerComponent } from '../header/user-inner/user-inner.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {iconSVG} from "../../../../_shared/enums/icon-svg.enum";
import {GlobalStore} from "../../../../_store/global.store";
import {TranslocoModule} from "@ngneat/transloco";
import { NotificationService } from 'src/app/_services/notification.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { Dropdown } from 'bootstrap';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { AccessType } from 'src/app/_shared/enums/access-type.enum';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        UserInnerComponent,
        NgIf,
        TranslocoModule,
        NgFor,
        FormatTimePipe
    ],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-md-16px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  iconSvg = iconSVG
  user = this.globalStore.currentUser
  dataList: any;
  constructor(
    private layout: LayoutService,
    private router: Router,
    private authService: AuthService,
    private globalStore: GlobalStore,
    private notificationService: NotificationService,
    private showMessageService: ShowMessageService
  ) {}

  ngOnInit(): void {
    let layout = localStorage.getItem('access_type');
    if(Number(layout) == Number(AccessType.GUARDIAN)){
      this.getNotification();
    }
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  toggle(modalElement){
    const modal=new Dropdown(modalElement);
    modal.toggle();
  }

  getNotification(){
    this.globalStore.isLoading = true;
    this.notificationService.getNotification().subscribe((res) => {
      console.log(res);
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) => {
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  // logout() {
  //   this.authService.logout().subscribe((res: any) => {
  //     let lang = localStorage.getItem('language');
  //     localStorage.clear();
  //     localStorage.setItem('language', lang);
  //     this.router.navigate(['/auth/login'],{
  //       queryParams: {},
  //     }).then(() => {
  //       window.location.reload();
  //     });
  //   }, err => {
  //     this.generalService.showToastMessageError400(err);
  //   })
  // }
}

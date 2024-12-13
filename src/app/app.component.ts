import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './modules/auth';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalStore } from './_store/global.store';
import { NgIf, CommonModule } from '@angular/common';
import { LoadingComponent } from './_shared/components/loading/loading.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  standalone: true,
  imports: [RouterOutlet,NgIf,LoadingComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  vm$ = this.globalStore.select((state) => {
    return {
      isLoading: state.isLoading,
    };
  });
  message: any

  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private globalStore: GlobalStore,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/firebase-messaging-sw.js')
    //     .then((registration) => {
    //       console.log('Service Worker registered with scope:', registration.scope);
    //     })
    //     .catch((err) => {
    //       console.log('Service Worker registration failed:', err);
    //     });
    // }

    const token = localStorage.getItem("Token");
    if(!token){
      this.router.navigateByUrl('/auth/login');
    }

    // this.msg.requestPerm("anbu");
    // this.messagingSerivce.requestPermission();
    // this.messagingSerivce.receiveMessaging();
    // this.message = this.messagingSerivce.currentMessage
    // console.log(this.message);

    const currentUserElement  = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentPermissions')));
    this.authService.currentPermissions = currentUserElement.asObservable();
    this.authService.currentPermissions.subscribe(x => {
      this.permissionsService.addPermission(x, (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
      });
    });
   }
}

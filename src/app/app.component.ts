import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './modules/auth';
import { RouterOutlet } from '@angular/router';
import { GlobalStore } from './_store/global.store';
import { NgIf, CommonModule } from '@angular/common';
import { LoadingComponent } from './_shared/components/loading/loading.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  standalone: true,
  imports: [RouterOutlet,NgIf,LoadingComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  vm$ = this.globalStore.select((state) => {
    return {
      isLoading: state.isLoading,
    };
  });

  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private globalStore: GlobalStore
  ) {
  }

  ngOnInit() {
    const currentUserElement  = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentPermissions')));
    this.authService.currentPermissions = currentUserElement.asObservable();
    this.authService.currentPermissions.subscribe(x => {
      this.permissionsService.addPermission(x, (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
      });
    });
   }
}

import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { LAYOUTS_CODE } from 'src/app/_shared/utils/constant';
import { UserModel } from '../models/user.model';
import { AuthHTTPService } from './auth-http/auth-http.service';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  isLoading$: Observable<boolean>;
  public currentPermissions: Observable<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private cookieService: CookieService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  login(dataLogin, isRememberPassword: boolean, requestOptions) {
    return this.authHttpService.login(dataLogin, requestOptions).pipe(map((res: any)=> {
      // if (res.status === 1) {
      //   this.authHttpService.getMyInformation(res.data.token).subscribe({
      //     next: (response:any) => {
      //       this.setDataLogin(res.data,response,isRememberPassword,dataLogin);
      //     },
      //     error: (error) => {

      //     }
      //   })
      // }
      localStorage.setItem('Token', res.data.token);
      localStorage.setItem('SchoolYear', res.data.schoolYear);
      localStorage.setItem('SchoolYearFirst', res?.data?.schoolYear[0]?.id);
      localStorage.setItem('UserInfo', res?.data?.user);
      return res;
    }));
  }

  setDataLogin(dataResponse:any, tokenLoginData:any,isRememberPassword:boolean, dataLogin:any){
    this.setLocalStorage(tokenLoginData);
    localStorage.setItem('Token', dataResponse.token);
    localStorage.setItem('userIdMd5', dataResponse.userIdMd5);
    localStorage.setItem('language', dataResponse.language);
    localStorage.setItem('needToChangePass', JSON.stringify(dataResponse.needToChangePass));

    let currentPermissions = localStorage.getItem('currentPermissions') ? JSON.parse(localStorage.getItem('currentPermissions')) : [];
    if(tokenLoginData.layouts && tokenLoginData.layouts.length > 0) {
      this.permissionsService.loadPermissions(currentPermissions,
        (permissionName, permissionsObject) => {
            return !!permissionsObject[permissionName];
        });
    } else this.permissionsService.loadPermissions([]);

    if (isRememberPassword) {
      this.cookieService.set('dataLogin', JSON.stringify(dataLogin));
    } else {
      this.cookieService.delete('dataLogin');
    }
    this.router.navigate(['/home']);
  }

  setLocalStorage(dataSave) {
    localStorage.setItem('User', JSON.stringify(dataSave.user));
    localStorage.setItem('Tenant', JSON.stringify(dataSave.tenant));
    localStorage.setItem('Layouts', JSON.stringify(dataSave.layouts));
    if(dataSave.layouts && dataSave.layouts.length > 0) {
      localStorage.setItem('currentLayout', JSON.stringify(dataSave.layouts[0]));
      this.mapDataLayout(dataSave.layouts[0], dataSave);
    } else {
      localStorage.setItem('currentLayout', JSON.stringify({}));
      localStorage.setItem('currentPermissions', JSON.stringify([]));
    }
    localStorage.setItem('appType', JSON.stringify(dataSave.appType));
    localStorage.setItem('appVersion', JSON.stringify(dataSave.appVersion));
    localStorage.setItem('deviceType', JSON.stringify(dataSave.deviceType));
    localStorage.setItem('deviceId', JSON.stringify(dataSave.deviceId));
    localStorage.setItem('deviceName', JSON.stringify(dataSave.deviceName));
    localStorage.setItem('deviceOs', JSON.stringify(dataSave.deviceOs));
  }

  mapDataLayout(layout: string, dataSave: any) {
    let convertDataCurrentUnit = {
      Code: '',
      Name: ''
    };
    let convertDataCurrentSchool = {
      Id: '',
      Name: ''
    };
    switch(layout) {
      case LAYOUTS_CODE.OMT:
        localStorage.removeItem('currentUnit');
        localStorage.removeItem('currentSchool');
        localStorage.removeItem('currentCampus');
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.omtLayout.permissions));
      break;
      case LAYOUTS_CODE.TENANT:
        localStorage.removeItem('currentUnit');
        localStorage.removeItem('currentSchool');
        localStorage.removeItem('currentCampus');
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.tenantLayout.permissions));
      break;
      case LAYOUTS_CODE.DEPARTMENT:
        convertDataCurrentUnit.Code = dataSave.departmentLayout[0].departmentCode;
        convertDataCurrentUnit.Name = dataSave.departmentLayout[0].departmentName;
        localStorage.setItem('currentUnit', JSON.stringify(convertDataCurrentUnit));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.departmentLayout[0].permissions));
      break;
      case LAYOUTS_CODE.DIVISION:
        convertDataCurrentUnit.Code = dataSave.divisionLayout[0].divisionCode;
        convertDataCurrentUnit.Name = dataSave.divisionLayout[0].divisionName;
        localStorage.setItem('currentUnit', JSON.stringify(convertDataCurrentUnit));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.divisionLayout[0].permissions));
      break;
      case LAYOUTS_CODE.SCHOOL:
        convertDataCurrentUnit.Code = dataSave.schoolLayout[0].school;
        convertDataCurrentUnit.Name = dataSave.schoolLayout[0].school;
        localStorage.setItem('currentUnit', JSON.stringify(convertDataCurrentUnit));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.schoolLayout[0].permissions));
      break;
      case LAYOUTS_CODE.CAMPUS:
        localStorage.setItem('currentCampus', JSON.stringify(dataSave.campusLayout[0]));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.campusLayout[0].permissions));
      break;
      case LAYOUTS_CODE.TEACHER:
        convertDataCurrentSchool.Id = dataSave.teacherLayout[0].schoolId;
        convertDataCurrentSchool.Name = dataSave.teacherLayout[0].schoolName;
        localStorage.setItem('currentSchool', JSON.stringify(convertDataCurrentSchool));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.teacherLayout[0].permissions));
      break;
      case LAYOUTS_CODE.STAFF:
        convertDataCurrentSchool.Id = dataSave.staffLayout[0].schoolId;
        convertDataCurrentSchool.Name = dataSave.staffLayout[0].schoolName;
        localStorage.setItem('currentSchool', JSON.stringify(convertDataCurrentSchool));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.staffLayout[0].permissions));
      break;
      case LAYOUTS_CODE.STUDENT:
        localStorage.removeItem('currentUnit');
        localStorage.removeItem('currentSchool');
        localStorage.removeItem('currentCampus');
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.studentLayout.permissions));
      break;
      case LAYOUTS_CODE.PARENT:
        localStorage.removeItem('currentUnit');
        localStorage.removeItem('currentSchool');
        localStorage.removeItem('currentCampus');
        localStorage.setItem('currentStudent', JSON.stringify(dataSave.parentLayout.students[0]));
        localStorage.setItem('currentPermissions', JSON.stringify(dataSave.parentLayout.permissions));
      break;
    }
  }

  verifyUser(emailPhone='', domain='') {
    this.isLoadingSubject.next(true);
    return this.authHttpService.verifyUser(emailPhone, domain);
  }

  sendVerifyCode(data = {}) {
    return this.authHttpService.sendVerifyCode(data);
  }

  checkValidTimeCode(userId = '') {
    return this.authHttpService.checkValidTimeCode(userId);
  }

  sendCode(code: string) {
    return this.authHttpService.sendCode(code);
  }

  changePassword(data = {}) {
    return this.authHttpService.changePassword(data);
  }

  logout() {
    return this.authHttpService.logout().pipe(finalize(() => {
      this.isLoadingSubject.next(false);
    }));

  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

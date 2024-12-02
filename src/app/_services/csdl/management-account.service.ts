import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManagementAccountService {

  constructor(private http: HttpClient) { }

  getManagementAccountList(code: string, pageIndex, pageSize, keyword: string = '') {
    return this.http.get(
      `${environment.apiUrl2}/moet-unit/${code}/user-manager?pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyword}`,
    );
  }

  storeManagementAccount(code: string, body: any) {
    return this.http.post(
      `${environment.apiUrl2}/moet-unit/${code}/user-manager`, body
    );
  }

  updateManagementAccount(code: string, userId: string, body: any) {
    return this.http.patch(
      `${environment.apiUrl2}/moet-unit/${code}/user-manager/${userId}`, body
    );
  }

}

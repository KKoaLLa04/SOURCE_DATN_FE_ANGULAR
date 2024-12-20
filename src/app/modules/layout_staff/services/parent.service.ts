import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private http: HttpClient
  ) { }

  getListParent(data: any){
    return this.http.get(`${environment.apiUrl}/manager/guardian`, {params: {...data}})
  }

  createNewParent(data: any){
    return this.http.post(`${environment.apiUrl}/manager/guardian/add`, data)
  }

  updateParent(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/update/${data.id}`, data)
  }

  changePassword(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/change/${data.id}`, data)
  }

  lockParent(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/lock/${data.id}`, data)
  }

  unLockParent(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/unlock/${data.id}`, data)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient
  ) { }

  getListTeacher(data: any){
    return this.http.get(`${environment.apiUrl}/manager/user`, {params: {...data}});
  }

  createNewTeacher(data: any){
    return this.http.post(`${environment.apiUrl}/manager/user/add`, data);
  }

  updateTeacherInformation(data: any){
    return this.http.post(`${environment.apiUrl}/manager/user/edit/${data.userId}`, data);
  }

  changePassword(data: any){
    return this.http.post(`${environment.apiUrl}/manager/user/change_password/${data.userId}`, data);
  }

  assignTeacherSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/user/assign-teacher/${data.id}`, data);
  }
}

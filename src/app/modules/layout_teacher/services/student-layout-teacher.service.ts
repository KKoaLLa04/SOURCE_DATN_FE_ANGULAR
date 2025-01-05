import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentLayoutTeacherService {

constructor(
    private http: HttpClient,
  ) { }

  getListStudent(data: any){
    return this.http.get(`${environment.apiUrl}/teacher/student/${data.class_id}`, {params: {...data}});
  }

  createNewStudent(data: any){
    return this.http.post(`${environment.apiUrl}/teacher/student/store`, data);
  }

  updateStudentInformation(data: any){
    return this.http.post(`${environment.apiUrl}/teacher/student/update/${data.id}`, data);
  }

  getStudentDetail(data: any){
    return this.http.get(`${environment.apiUrl}/teacher/student/show/${data.id}`)
  }

  getListParents(data: any){
    return this.http.get(`${environment.apiUrl}/teacher/student/parents`, {params: {...data}})
  }

  assignParent(data: any){
    return this.http.post(`${environment.apiUrl}/teacher/student/assign-parent/${data.student_id}`, data)
  }

  lockParent(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/lock/${data.id}`, data)
  }

  unLockParent(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/unlock/${data.id}`, data)
  }

  changePassword(data: any){
    return this.http.put(`${environment.apiUrl}/manager/guardian/change/${data.id}`, data)
  }
}

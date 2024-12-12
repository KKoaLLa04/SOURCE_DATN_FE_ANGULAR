import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  getListStudent(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student`, {params: {...data}})
  }

  updateStudentInformation(data: any){
    return this.http.post(`${environment.apiUrl}/manager/student/update/${data.id}`, data)
  }

  createNewStudent(data: any){
    return this.http.post(`${environment.apiUrl}/manager/student/store`, data)
  }

  getStudentDetail(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student/show/${data.id}`)
  }

  assignParent(data: any){
    return this.http.post(`${environment.apiUrl}/manager/student/assign-parent/${data.student_id}`, data)
  }

  getListParents(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student/parents`, {params: {...data}})
  }
}

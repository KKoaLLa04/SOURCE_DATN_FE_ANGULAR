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
    console.log(data)
  }

  createNewStudent(data: any){
    console.log(data)
  }
}

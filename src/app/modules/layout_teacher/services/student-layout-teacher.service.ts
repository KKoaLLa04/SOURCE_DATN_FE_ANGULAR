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
    return this.http.get(`${environment.apiUrl}/teacher/student/${data.classId}`, {params: {...data}});
  }
}

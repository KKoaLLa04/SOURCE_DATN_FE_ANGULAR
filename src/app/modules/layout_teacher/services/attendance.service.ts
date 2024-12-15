import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient,
  ) { }

  getListAttendance(data: any){
    return this.http.get(`${environment.apiUrl}/teacher/rollcallteacher`, {params: {...data}});
  }

  getListStudentAttendance(data: any){
    return this.http.get(`${environment.apiUrl}/teacher/rollcallteacher/student/${data.class_id}`);
  }

  attendanced(data: any){
    return this.http.post(`${environment.apiUrl}/teacher/rollcallteacher/attendaced/student/${data.classId}`, data);
  }
}

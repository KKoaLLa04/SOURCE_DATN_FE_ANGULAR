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
    return this.http.get(`${environment.apiUrl}/manager/rollcall`, {params: {...data}});
  }

  getListStudentAttendance(data: any){
    return this.http.get(`${environment.apiUrl}/manager/rollcall/student/${data.class_id}/${data.diemdanh_id}`);
  }

  attendanced(data: any, classId: any){
    return this.http.post(`${environment.apiUrl}/manager/rollcall/attendaced/student/${classId}`, data);
  }

  listAttendanceTimetable(data: any){
    return this.http.post(`${environment.apiUrl}/manager/rollcall`, data);
  }

  getHistoryAttendance(data: any){
    return this.http.get(`${environment.apiUrl}/manager/rollcallhistory/showclass/${data.classId}` , {params: {...data}});
  }

  getHistoryListStudentAttendance(data: any){
    return this.http.get(`${environment.apiUrl}/manager/rollcallhistory/student/${data.class_id}/${data.teacher_subject_timetable_id}`);
  }

  callApiQrDataAttendance(classId: any, data: any){
    return this.http.post(`${environment.apiUrl}/rollcall/update/attendaced/${data.classId}/student`, data);
  }
}

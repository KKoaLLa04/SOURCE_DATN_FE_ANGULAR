import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigTimetableService {

  constructor(
    private http: HttpClient
  ) { }

  getListTimetable(){
    return this.http.get(`${environment.apiUrl}/manager/timetable/config`)
  }

  getListTimetableSubjectConfig(){
    return this.http.get(`${environment.apiUrl}/manager/timetable/subject-config`)
  }

  updateTimetable(data: any){
    return this.http.post(`${environment.apiUrl}/manager/timetable/edit-config`, data)
  }

  updateTimetableSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/timetable/edit-subject-config`, data)
  }
}

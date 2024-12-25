import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

constructor(
    private http: HttpClient
  ) { }
  
  getListTimetable(data: any){
    return this.http.get(`${environment.apiUrl}/guardian/timetable`, {params: {...data}})
  }
}

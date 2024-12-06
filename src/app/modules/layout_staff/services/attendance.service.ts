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
}

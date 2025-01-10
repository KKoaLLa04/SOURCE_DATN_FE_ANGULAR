import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeIndexService {

  constructor(
    private http: HttpClient
  ) { }
  
  getStatisticManagerDayHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/day`)
  }

  getStatisticManagerWeekHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/week`)
  }

  getStatisticManagerMonthHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/month`)
  }

  getStatisticClassDayHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/day-class`)
  }

  getStatisticClassWeekHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/week-class`)
  }

  getStatisticClassMonthHome(){
    return this.http.get(`${environment.apiUrl}/manager/statisattendance/month-class`)
  }

  getStatisticClassTeacherDayHome(){
    return this.http.get(`${environment.apiUrl}/teacher/statisattendance/day`)
  }

  getStatisticClassTeacherWeekHome(){
    return this.http.get(`${environment.apiUrl}/teacher/statisattendance/week`)
  }

  getStatisticClassTeacherMonthHome(){
    return this.http.get(`${environment.apiUrl}/teacher/statisattendance/month`)
  }
}

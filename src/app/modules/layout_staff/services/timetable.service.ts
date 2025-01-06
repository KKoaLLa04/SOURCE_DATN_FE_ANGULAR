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

  getListTimes(){
    return this.http.get(`${environment.apiUrl}/manager/category-timetable`)
  }

  createNewTimes(data: any){
    return this.http.post(`${environment.apiUrl}/manager/category-timetable/store`, data)
  }

  updateTimes(data: any){
    return this.http.post(`${environment.apiUrl}/manager/category-timetable/edit`, data)
  }

  deleteTimes(data: any){
    return this.http.post(`${environment.apiUrl}/manager/category-timetable/delete`, data)
  }
}

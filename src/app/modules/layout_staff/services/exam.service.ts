import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

constructor(
  private http: HttpClient
) { }

  getListExam(data: any){
    return this.http.get(`${environment.apiUrl}/exam`, {params: {...data}})
  }

  getListExamTimes(data: any){
    return this.http.get(`${environment.apiUrl}/exam-period`, {params: {...data}})
  }

  createNewExam(data: any){
    return this.http.post(`${environment.apiUrl}/exam/store`, data)
  }

  updateExam(data: any){
    return this.http.post(`${environment.apiUrl}/exam/update`, data)
  }

  createNewTimesExam(data: any){
    return this.http.post(`${environment.apiUrl}/exam-period/store`, data)
  }
}

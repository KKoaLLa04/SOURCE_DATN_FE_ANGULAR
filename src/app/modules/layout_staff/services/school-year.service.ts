import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

constructor(
  private http: HttpClient
) { }


  getListSchoolyear(data: any){
    return this.http.get(`${environment.apiUrl}/manager/schoolyear`, {params: {...data}})
  }

  createNewSchoolyear(data: any){
    return this.http.post(`${environment.apiUrl}/manager/schoolyear/add`, data)
  }

  updateSchoolyear(data: any){
    return this.http.post(`${environment.apiUrl}/manager/schoolyear/edit/${data.schoolYearId}`, data)
  }

  deleteSchoolyear(data: any){
    return this.http.post(`${environment.apiUrl}/manager/schoolyear/delete/${data.schoolYearId}`, data)
  }
}

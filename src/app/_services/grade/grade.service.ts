import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  // 1. get list grade
  getList(keyword: string, trainingLevel: string = '', isActive: string = '') {
    return this.http.get(`${environment.apiUrl2}/grade?keyWord=${keyword}&educationalStages=${trainingLevel}&isActive=${isActive}`);
  }

  // 2. create grade
  createGrade(data) {
    return this.http.post(`${environment.apiUrl2}/grade`, data);
  }

  // 3. update grade
  updateGrade(data, id: string) {
    return this.http.patch(`${environment.apiUrl2}/grade/${id}`, data);
  }

  // 4. delete grade
  deleteGrade(id: string) {
    return this.http.delete(`${environment.apiUrl2}/grade/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient,
  ) { }

  getListSubject(dataFilter: { keyword: string, educationalStages: number | string, pageIndex: number, pageSize: number }) {
    return this.http.get(`${environment.apiUrl2}/subject?keyWord=${dataFilter.keyword}&educationalStages=${dataFilter.educationalStages}&pageSize=${dataFilter.pageSize}&pageIndex=${dataFilter.pageIndex}`);
  }

  createSubject(data) {
    return this.http.post(`${environment.apiUrl2}/subject`, data);
  }

  updateSubject(data) {
    return this.http.patch(`${environment.apiUrl2}/subject/${data.id}`, data);
  }

  deleteSubject(data) {
    return this.http.delete(`${environment.apiUrl2}/subject/${data.id}`, data);

  }

}

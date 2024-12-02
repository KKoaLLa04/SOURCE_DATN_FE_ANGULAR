import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchoolList(code, pageIndex: number, pageSize: number,  keyword: string = '') {
    return this.http.get(
      `${environment.apiUrl2}/moet-unit/${code}/schools?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}`,
    );
  }
}

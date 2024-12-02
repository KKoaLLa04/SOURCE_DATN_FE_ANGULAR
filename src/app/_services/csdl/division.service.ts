import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }

  getDivisionList(code, pageIndex:number, pageSize:number, keyword: string = '') {
    return this.http.get(
      `${environment.apiUrl2}/moet-unit/${code}/divisions?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}`,
    );
  }
}

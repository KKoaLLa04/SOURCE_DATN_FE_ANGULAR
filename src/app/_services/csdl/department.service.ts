import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentList(pageIndex:number, pageSize:number, keyword: string = '') {
    return this.http.get(
      `${environment.apiUrl2}/moet-unit/departments?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}`,
    );
  }
}

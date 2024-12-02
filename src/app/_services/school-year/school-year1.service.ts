import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreSchoolYear } from 'src/app/_models/school-year/store-school-year.model';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SchoolYear1Service {

  constructor(private http: HttpClient) { }

  // danh sách năm học
  getListSchoolYear(keyWord: string = '', status?: any, pageSize: number = PAGE_SIZE_DEFAULT, pageIndex: number = PAGE_INDEX_DEFAULT) {
    let strFilter: string = `keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    if (status) {
      strFilter = `keyWord=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    }
    return this.http.get(`${environment.apiUrl2}/school-year?${strFilter}`);
  }


  // them moi nam hoc
  storeSchoolYear(data: StoreSchoolYear) {
    return this.http.post(`${environment.apiUrl2}/school-year`, data);
  }

  // chinh sua nam hoc
  updateSchoolYear(data: any) {
    return this.http.patch(`${environment.apiUrl2}/school-year/${data.id}`, data);
  }

  // chi tiet nam hoc
  detailSchoolYear(id: string) {
    return this.http.get(`${environment.apiUrl2}/school-year/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreSchoolYear } from 'src/app/_models/school-year/store-school-year.model';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  constructor(private http: HttpClient) { }

  // 1. danh sach nam hoc
  getListSchoolYears(keyWord = '', status: number | '' = '', pageSize: number = 99999, pageIndex: number = PAGE_INDEX_DEFAULT) {
    return this.http.get(`${environment.apiUrl2}/school-year-omt?keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}&status=${status}`)
  }

  // 2. thêm năm học
  create(data) {
    return this.http.post(`${environment.apiUrl2}/school-year-omt`, data);
  }

  // 3. cập nhật năm học
  update(id: string, data) {
    return this.http.patch(`${environment.apiUrl2}/school-year-omt/${id}`, data);
  }
}

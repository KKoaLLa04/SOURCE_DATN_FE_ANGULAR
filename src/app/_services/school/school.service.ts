import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) { }

  // 2. get detail school
  getDetail(tenantId: string, id: string) {
    return this.http.get(
      `${environment.apiUrl2}/${tenantId}/school/${id}/detail`
    );
  }

  // 3. lấy thông tin thêm để map với thông tin trường
  getAnotherInfoToMapSchool(tenantId: string) {
    return this.http.get(
      `${environment.apiUrl2}/${tenantId}/school/create`
    );
  }

  // 4. update school
  update(tenantId: string, school_id: string, dataUpdate: any) {
    return this.http.patch(
      `${environment.apiUrl2}/${tenantId}/school/${school_id}`,
      dataUpdate
    );
  }
}

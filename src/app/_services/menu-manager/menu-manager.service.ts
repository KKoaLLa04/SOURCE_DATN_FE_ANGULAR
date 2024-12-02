import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {

  constructor(
    private http: HttpClient,
  ) { }

  // Lấy danh sách gói menu
  getListMenuPackage(keyWord: string) {
    return this.http.get(`${environment.apiUrl2}/menu-package?keyWord=${keyWord}`);
  }

  // Lấy danh sách chi tiết gói menu
  getDetailMenuPackage(menuPackageId: string) {
    return this.http.get(`${environment.apiUrl2}/menu-package/${menuPackageId}`);
  }

  // Thêm mới gói menu
  storeMenuPackage(data: any) {
    return this.http.post(`${environment.apiUrl2}/menu-package`, data);
  }

  // Sửa gói menu
  updateMenuPackage(menuPackageId: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/menu-package/${menuPackageId}`, data);
  }

  // Xóa gói menu
  deleteMenuPackage(menuPackageId: string) {
    return this.http.delete(`${environment.apiUrl2}/menu-package/${menuPackageId}`);
  }

  // Danh sách menu item
  getListMenuItem(keyWord: string = '', status: any, menuType: any, pageSize: number = 15, pageIndex: number = 1) {
    let strFilter: string = `pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyWord}`;
    if (status && menuType) {
      strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&status=${status}&menuType=${menuType}&keyWord=${keyWord}`;
    } else {
      status ? strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&status=${status}&keyWord=${keyWord}` : strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&menuType=${menuType}&keyWord=${keyWord}`;
    }
    return this.http.get(`${environment.apiUrl2}/menu-item?${strFilter}`);
  }

  // Thêm mới menu item
  storeMenuItem(data) {
    return this.http.post(`${environment.apiUrl2}/menu-item`, data);
  }

  // Chỉnh sửa menu item
  updateMenuItem(data: any, menuId: string) {
    return this.http.patch(`${environment.apiUrl2}/menu-item/${menuId}`, data);
  }

  // Xóa menu item
  deleteMenuItem(menuId: string) {
    return this.http.delete(`${environment.apiUrl2}/menu-item/${menuId}`);
  }
}

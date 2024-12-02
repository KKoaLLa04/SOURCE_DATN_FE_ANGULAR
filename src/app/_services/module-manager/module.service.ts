import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient,
  ) { }

  getListModule(dataFilter: { keyWord: string, isActive: number | string,category: number | string, pageSize: number, pageIndex: number }) {
    return this.http.get(`${environment.apiUrl}/core-module/index?KeyWord=${dataFilter.keyWord}&IsActive=${dataFilter.isActive}&category=${dataFilter.category}&PageSize=${dataFilter.pageSize}&PageIndex=${dataFilter.pageIndex}`);
  }

  createModule(data) {
    return this.http.post(`${environment.apiUrl}/core-module/store`, data);
  }

  updateModule(data) {
    return this.http.patch(`${environment.apiUrl}/core-module/update`, data);
  }

  deleteModule(data) {
    let options = { body: data };
    return this.http.delete(`${environment.apiUrl}/core-module/delete`, options);
  }

  changeStatus(data) {
    return this.http.patch(`${environment.apiUrl}/core-module/change-status`, data);
  }

  detailModule(dataFilter: { id: string }) {
    return this.http.get(`${environment.apiUrl}/core-module/detail/${dataFilter.id}`);
  }


  getListPermission(dataFilter: { keyWord: string, id: string }) {
    return this.http.get(`${environment.apiUrl}/core-module/${dataFilter.id}/permissions?KeyWord=${dataFilter.keyWord}`);
  }
  // add permission to module
  addPermissionModule(data = {}) {
    return this.http.post(`${environment.apiUrl}/core-module/permissions/store`, data);
  }

  // update permission to module
  updatePermissionModule(data = {}) {
    return this.http.patch(`${environment.apiUrl}/core-module/permissions/update`, data);
  }

  deletePermissionModule(data) {
    let options = { body: data };
    return this.http.delete(`${environment.apiUrl}/core-module/permissions/delete`, options);
  }

  // get list tenants of module
  getListTenantModule(id: string, keyword: string) {
    return this.http.get(`${environment.apiUrl}/core-module/${id}/tenants?KeyWord=${keyword}`);
  }

  // get list tenants to assign to module
  getListTenantAssignModule(id: string, keyword: string) {
    return this.http.get(`${environment.apiUrl}/core-module/${id}/tenants-to-assign?KeyWord=${keyword}`);
  }

  // assign tenant to module
  assignTenantToModule(data) {
    return this.http.post(`${environment.apiUrl}/core-module/assign-tenants`, data);
  }

  // remove tenant to module
  removeTenantToModule(data) {
    let options = { body: data };
    return this.http.delete(`${environment.apiUrl}/core-module/remove-tenant`, options);
  }
}

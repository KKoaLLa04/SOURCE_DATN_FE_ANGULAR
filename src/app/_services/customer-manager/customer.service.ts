import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerList(pageIndex, pageSize, keyword: string = '', isActive = null) {
    return this.http.get(
      `${environment.apiUrl2}/tenant?pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyword}&isActive=${isActive}`,
    );
  }

  storeTenant(body: any) {
    return this.http.post(
      `${environment.apiUrl2}/tenant`, body
    );
  }

  getTenantById(id: string) {
    return this.http.get(
      `${environment.apiUrl2}/tenant/${id}`,
    );
  }

  getDataEditTenantById(id: string) {
    return this.http.get(
      `${environment.apiUrl2}/tenant/${id}/edit`,
    );
  }

  updateTenant(id: string, body: any) {
    return this.http.patch(
      `${environment.apiUrl2}/tenant/${id}`, body
    );
  }

  // danh sách môn học trong chi tiết khách hàng
  getListSubjectTenantById(tenantId: string, subjectType: number, keyWord: string = '', pageSize: number = 15, pageIndex: number = 1) {
    if (subjectType) {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/subject?subjectType=${subjectType}&keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    } else {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/subject?keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }
  }

  // danh sách khối học trong chi tiết khách hàng
  getListGradeTenantById(tenantId: string, educationalStages: number, keyWord: string = '', pageSize: number = 15, pageIndex: number = 1) {
    if (educationalStages) {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/grade?educationalStages=${educationalStages}&keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    } else {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/grade?keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }
  }

  // danh sách năm học trong chi tiết khách hàng
  getListSchoolYearTenantById(tenantId: string, status: string, keyWord: string = '') {
    if (status) {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/school-year?keyWord=${keyWord}&status=${status}`);
    } else {
      return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/school-year?keyWord=${keyWord}`);
    }
  }

  // khoi tao tai khoan quan tri khach hang

  // lay danh sach tai khoan quan ly
  getListAdminAccountTenant(tenantId: string) {
    return this.http.get(`${environment.apiUrl}/core-user/admin-tenant/${tenantId}/index`,);
  }

  // them moi tai khoan quan ly
  storeAdminAccountTenant(tenantId: string, data: any) {
    return this.http.post(`${environment.apiUrl}/core-user/admin-tenant/${tenantId}/store`, data);
  }

  // doi mat khau tai khoan quan ly
  changePasswordAdminAccountTenant(tenantId: string, data: any) {
    return this.http.patch(`${environment.apiUrl}/core-user/admin-tenant/${tenantId}/change-password`, data);
  }

  // quan ly module trong cau hinh khach hang

  // lay danh sach module
  getListModuleTenant(tenantId: string, Keyword: string = '', PageSize: number = PAGE_SIZE_DEFAULT, PageIndex: number = PAGE_INDEX_DEFAULT) {
    return this.http.get(`${environment.apiUrl}/core-tenant/${tenantId}/modules?Keyword=${Keyword}&PageSize=${PageSize}&PageIndex=${PageIndex}`,);
  }

  // lay danh sach permission cua module
  getPermissonOfModuleTenant(tenantId: string, moduleId: string) {
    return this.http.get(`${environment.apiUrl}/core-tenant/${tenantId}/modules/${moduleId}/permissions`,);
  }

  // lay danh sach module de gan
  getListModuleAssign(tenantId: string) {
    return this.http.get(`${environment.apiUrl}/core-tenant/${tenantId}/modules-to-assign`,);
  }

  // gan module
  assignModuleToTenant(data: any) {
    return this.http.post(`${environment.apiUrl}/core-tenant/assign-modules`, data);
  }

  // go module
  removeModuleTenant(data: any) {
    let options = { body: data };
    return this.http.delete(`${environment.apiUrl}/core-tenant/remove-module`, options);
  }

  // api truong hoc quan ly

  // lay danh sach truong hoc quan ly
  getListSchoolManager(tenantId: string, keyWord: string = '', pageIndex: number = PAGE_INDEX_DEFAULT, pageSize: number = PAGE_SIZE_DEFAULT) {
    return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/school?keyWord=${keyWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // them moi truong hoc quan ly
  storeSchoolManager(tenantId: string, data: any) {
    return this.http.post(`${environment.apiUrl2}/${tenantId}/school`, data);
  }

  // them moi truong hoc quan ly theo co so du lieu nganh
  storeSchoolFromCSDL(tenantId: string, data: any) {
    return this.http.post(`${environment.apiUrl2}/${tenantId}/school/create-by-moet-unit-code`, data);
  }

  // cap nhat truong hoc quan ly
  updateSchoolManager(tenantId: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/tenant/${tenantId}/school/${data.id}`, data);
  }

  // lay danh sach truong hoc de them
  getDataSchool(tenantId: string, departmentCode: string, divisionCode: string = '', keyWord: string = '', pageIndex: number = PAGE_INDEX_DEFAULT, pageSize: number = PAGE_SIZE_DEFAULT) {
    return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/school/create?departmentCode=${departmentCode}&divisionCode=${divisionCode}&keyWord=${keyWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // lay data so
  getDataDepartments(keyWord: string = '', pageSize: number = PAGE_SIZE_DEFAULT, pageIndex: number = PAGE_INDEX_DEFAULT) {
    return this.http.get(`${environment.apiUrl2}/moet-unit/departments?keyWord=${keyWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // lay data phong thuoc so
  getDataDivisionsOfDepartments(moetUnitCode: string,keyWord: string = '', pageSize: number = PAGE_SIZE_DEFAULT, pageIndex: number = PAGE_INDEX_DEFAULT) {
    return this.http.get(`${environment.apiUrl2}/moet-unit/${moetUnitCode}/divisions?keyWord=${keyWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // lay data moet chua gan cho khach hang
  getDataMoetUnassigned(moetUnitCode: string = '') {
    return this.http.get(`${environment.apiUrl2}/moet-unit/${moetUnitCode}/schools-unassigned`);
  }

  // lay danh sach goi menu cua khach hang
  getListMenuPackageOfTenant(keyWord: string, tenantId: string) {
    return this.http.get(`${environment.apiUrl2}/tenant/${tenantId}/menu-package?keyWord=${keyWord}`);
  }

  // doi goi menu ap dung cho truong
  changeMenuPackageApplyOfTenant(tenantId: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/tenant/${tenantId}/menu-package-change-apply`, data);
  }
}

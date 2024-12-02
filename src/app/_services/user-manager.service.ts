import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    constructor(private http: HttpClient) { }

    getListUser(keyword: string = '', pageSize: number = 15, pageIndex: number = 1) {
        return this.http.get(`${environment.apiUrl}/core-user/index?Keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
    }

    storeUser(data: any) {
        return this.http.post(`${environment.apiUrl}/core-user/store`, data);
    }

    updateUser(data: any) {
        return this.http.patch(`${environment.apiUrl}/core-user/update`, data);
    }

    lockUser(data: any) {
        return this.http.patch(`${environment.apiUrl}/core-user/update-status`, data);
    }

    changePasswordUser(data: any) {
        return this.http.patch(`${environment.apiUrl}/core-user/change-password`, data);
    }

    assignRole(data: any) {
        return this.http.post(`${environment.apiUrl}/core-user/assign-roles`, data);
    }

    getRoleOfUser(id: string) {
        return this.http.get(`${environment.apiUrl}/core-user/${id}/roles`)
    }
}


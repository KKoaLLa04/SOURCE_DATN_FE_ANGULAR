import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CircularsService {

    constructor(private http: HttpClient) { }

    getListCirculars(keyWord: string) {
        return this.http.get(`${environment.apiUrl2}/circular-item?keyWord=${keyWord}`);
    }

    getListCircularsApply(keyWord: string) {
        return this.http.get(`${environment.apiUrl2}/circular-apply?keyWord=${keyWord}`);
    }

    storeCirculars(data: any) {
        return this.http.post(`${environment.apiUrl2}/circular-item`, data);
    }

    updateCirculars(data: any) {
        return this.http.patch(`${environment.apiUrl2}/circular-item/${data.id}`, data);
    }

    detailCirculars(id: string) {
        return this.http.get(`${environment.apiUrl2}/circular-item/${id}/edit`);
    }
}

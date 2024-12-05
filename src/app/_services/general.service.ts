import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ShowMessageService } from './show-message.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private http: HttpClient,
        private showMessageService: ShowMessageService
    ) { }

    uploadFileBase64(data: any) {
        // data input type base 64
        return this.http.post(`${environment.apiUrl}/common/upload-file-base64`, data);
    }

    uploadFile(data: any) {
        // data input type file
        return this.http.post(`${environment.apiUrl}/common/upload-file`, data);
    }

    uploadMultipleFile(data: any) {
        // data input type file
        return this.http.post(`${environment.apiUrl}/common/upload-multiple-image`, data);
    }

    // lấy danh sách tỉnh/thành phố

    /* show toast message 400 */
    showToastMessageError400(error: any): void {
        let arrMessage = error.errors;
        for (let key in arrMessage) {
            arrMessage[key].forEach(element => {
                this.showMessageService.error(element);
            });
        }
    }
}


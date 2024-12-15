import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTokenService {

  constructor(
    private http: HttpClient
  ) { }

  pushDeviceToken(data: any){
    return this.http.post(`${environment.apiUrl}/device_token`, data)
  }
}

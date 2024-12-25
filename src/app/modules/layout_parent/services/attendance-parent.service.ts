import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceParentService {

  constructor(
    private http: HttpClient
  ) { }
  
  getListHistoryParent(data: any){
    return this.http.get(`${environment.apiUrl}/guardian/parentrollcallhistory`, {params: {...data}})
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private http: HttpClient
  ) { }

  getListParent(data: any){
    return this.http.get(`${environment.apiUrl}/manager/guardian`, {params: {...data}})
  }
}

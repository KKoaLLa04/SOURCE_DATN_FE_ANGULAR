import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteMarkParentService {

  constructor(
    private http: HttpClient
  ) { }
  
  getListNoteMark(data: any){
    return this.http.get(`${environment.apiUrl}/guardian/point-student`, {params: {...data}})
  }
}

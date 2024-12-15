import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteMarkService {

  constructor(
    private http: HttpClient
  ) { }

  getListNoteMarkToSubject(data?: any){
    // return of([
    //   {
    //     code: "123456789",
    //     name: "Nguyen duy kien",
    //     dob: 123456789,
    //     tx1: 10,
    //     tx2: 9,
    //     tx3: 6,
    //     tx4: 9,
    //     dgk1:  10,
    //     dgk2: 10,
    //     dtb: 10,
    //     note: "hay nhak",
    //     contact: "0123456489"
    //   }
    // ])
    return this.http.get(`${environment.apiUrl}/point-student`, {params: {...data}})
  }

  updateNoteMark(data: any){
    return this.http.post(`${environment.apiUrl}/point-student/store-point`, data)
  }

}

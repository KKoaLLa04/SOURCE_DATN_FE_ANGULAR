import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteMarkService {

  constructor(
    private http: HttpClient
  ) { }

  getListNoteMarkToSubject(type?: any){
    return of([
      {
        code: "123456789",
        name: "Nguyen duy kien",
        dob: 123456789,
        tx1: 10,
        tx2: 9,
        tx3: 6,
        tx4: 9,
        dgk1:  10,
        dgk2: 10,
        dtb: 10,
        note: "hay nhak",
        contact: "0123456489"
      }
    ])
  }

}

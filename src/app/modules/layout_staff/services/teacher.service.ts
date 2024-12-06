import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }

  getListTeacher(){
    return of(
      [
        {
          userId: 1,
          userName: "Duy kien",
          userCode: "212",
          userEmail: "duykien@gmail.com",
          userPhone: "0123654789",
          userMainClassName: "6a2",
          userAccessType: 1,
          userStatus: 1,
          userDob: 123456798
        }
      ]
    )
  }

  createNewTeacher(data: any){
    console.log(data);
  }

  updateTeacherInformation(data: any){
    console.log(data)
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor() { }

  getListAttendance(){
    return of(
      [
        {
          classId: 1,
          className: "Lop 6",
          grade: "Khoi 6",
          totalStudent: 2,
          dateAttendanced: "2024-10-23",
          attendanceAt: 1729871401,
          fullname: "duy kien",
          email: "email@gmail.com",
          status: 0,
          studentAttendanced: 12,
          attendanceBy: 3
       },
       {
        classId: 1,
        className: "Lop 6",
        grade: "Khoi 6",
        totalStudent: 2,
        dateAttendanced: "2024-10-23",
        attendanceAt: 1729871401,
        fullname: "duy kien",
        email: "email@gmail.com",
        status: 0,
        studentAttendanced: 12,
        attendanceBy: 3
        }
      ]
    )
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassStudyService {

constructor() { }

  getListClass(){
    return of([
      {
        id: 1,
        name: "Lop 6a1",
        status: 1,
        teacher_name: "Duy kien",
        teacher_email: "ndkdz@gmail.com",
        academic_name: "KH18",
        academic_code: "CODE1",
        grade: "KHoi 9",
        grade_id: 1,
        school_year_id: 1,
        teacher_id: 1,
        academic_id: 1
      }
    ])
  }

  addNewClass(data: any){
    console.log(data)
  }

  updateClassInformation(data: any){
    console.log(data)
  }

  deleteClassStudy(data: any){
    console.log(data)
  }

  assignTeacher(data: any) {
    console.log(data)
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

constructor() { }


  getListAcademicYear(){
    return of(
      [
        {
          id: 1,
          name: "KH18",
          code: "NKH123",
          status: 0,
          start_year: "2024-12-1",
          end_year: "2024-12-1",
          gradeName: "Khối 6"
        }
      ]
    )
  }

  createNewAcademic(data: any) {
    console.log(data)
  }

  updateAcademic(data: any) {
    console.log(data)
  }

  deleteAcademic(data: any){
    console.log(data)
  }
}

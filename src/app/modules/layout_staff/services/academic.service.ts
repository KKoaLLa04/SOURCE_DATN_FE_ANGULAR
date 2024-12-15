import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

constructor(
  private http: HttpClient
) { }


  getListAcademicYear(data: any){
    // return of(
    //   [
    //     {
    //       id: 1,
    //       name: "KH18",
    //       code: "NKH123",
    //       status: 0,
    //       start_year: "2024-12-1",
    //       end_year: "2024-12-1",
    //       gradeName: "Khối 6"
    //     }
    //   ]
    // )
    return this.http.get(`${environment.apiUrl}/manager/academicyear`, {params: {...data}})
  }

  createNewAcademic(data: any) {
    return this.http.post(`${environment.apiUrl}/manager/academicyear/add`, data)
  }

  updateAcademic(data: any) {
    return this.http.put(`${environment.apiUrl}/manager/academicyear/update/${data.id}`, data)
  }

  deleteAcademic(data: any){
    return this.http.delete(`${environment.apiUrl}/manager/academicyear/delete/${data}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }

  getListSubject(){
    // return of(
    //   [
    //     "Toán học",
    //     "Ngữ văn",
    //     "Ngoại ngữ 1",
    //     "Giáo dục công dân",
    //     "Lịch sử và Địa lí",
    //     "Khoa học tự nhiên",
    //     "Công nghệ",
    //     "Tin học",
    //     "Giáo dục thể chất",
    //     "Nghệ thuật (âm nhạc, mĩ thuật)"
    //   ]
    // )
    return this.http.get(`${environment.apiUrl}/manager/subject`)
  }

  createNewSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/subject/create`, data)
  }

  updateSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/subject/update/${data.id}`, data)
  }

  deleteSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/subject/delete/${data.id}`, data)
  }
}

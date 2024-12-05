import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor() { }

  getListSubject(){
    return of(
      [
        "Toán học",
        "Ngữ văn",
        "Ngoại ngữ 1",
        "Giáo dục công dân",
        "Lịch sử và Địa lí",
        "Khoa học tự nhiên",
        "Công nghệ",
        "Tin học",
        "Giáo dục thể chất",
        "Nghệ thuật (âm nhạc, mĩ thuật)"
      ]
    )
  }
}

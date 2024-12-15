import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticAttendanceService {

  constructor(private http: HttpClient) { }

  getListStatisticAttendance(data: any){
    // return of(
    //   [
    //     {
    //       class_name: "6a1",
    //       grade_name: "Khối 6",
    //       status_class: 2,
    //       teacher_name: "Chưa có giáo viên chủ nhiệm",
    //       total_students: 0
    //     },
    //     {
    //       class_name: "6a1",
    //       grade_name: "Khối 6",
    //       status_class: 2,
    //       teacher_name: "Chưa có giáo viên chủ nhiệm",
    //       total_students: 0
    //     },
    //     {
    //       class_name: "6a1",
    //       grade_name: "Khối 6",
    //       status_class: 2,
    //       teacher_name: "Chưa có giáo viên chủ nhiệm",
    //       total_students: 0
    //     }
    //   ]
    // )
    return this.http.get(`http://127.0.0.1:8000/api/manager/rollcallStatistics`, {params: {...data}})
  }

  getListStatistic(data: any){
    // return of(
    //   [
    //     {
    //       student_name: "Nguyễn thị trang",
    //       student_code: "STU-111",
    //       total_present: 1,
    //       total_absent: 2,
    //       total_late: 0,
    //       date: [
    //         {
    //           date: "16/11/2024",
    //           status: 5
    //         },
    //         {
    //           date: "16/11/2024",
    //           status: 5
    //         },
    //         {
    //           date: "16/11/2024",
    //           status: 5
    //         },
    //         {
    //           date: "16/11/2024",
    //           status: 5
    //         }
    //       ]
    //     }
    //   ]
    // )
    return this.http.get(`${environment.apiUrl}/manager/rollcallStatistics/showclass/${data.classId}`, {params: {...data}})
  }
}

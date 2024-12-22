import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassStudyService {

constructor(
  private http: HttpClient
) { }

  getListClass(data: any){
    // return of([
    //   {
    //     id: 1,
    //     name: "Lop 6a1",
    //     status: 1,
    //     teacher_name: "Duy kien",
    //     teacher_email: "ndkdz@gmail.com",
    //     academic_name: "KH18",
    //     academic_code: "CODE1",
    //     grade: "KHoi 9",
    //     grade_id: 1,
    //     school_year_id: 1,
    //     teacher_id: 1,
    //     academic_id: 1
    //   }
    // ])
    return this.http.get(`${environment.apiUrl}/manager/class`, {params: {...data}})
  }

  getDataForm(){
    return this.http.get(`${environment.apiUrl}/manager/class/form`)
  }

  addNewClass(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/create`, data)
  }

  updateClassInformation(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/update`, data)
  }

  deleteClassStudy(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/delete`, data)
  }

  assignTeacher(data: any) {
    return this.http.post(`${environment.apiUrl}/manager/class/assignMainTeacher`, data)
  }

  getDataFormAssignTeacher(data: any){
    return this.http.get(`${environment.apiUrl}/manager/class/formAssignMainTeacher`, {params: {...data}})
  }

  getListStudentDetailClass(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student/detail_class_current`, {params: {...data}})
  }

  getListStudentByClass(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student/student_by_class`, {params: {...data}})
  }

  addNewStudent(data: any){
    return this.http.post(`${environment.apiUrl}/manager/student/change_class_for_student`, data)
  }

  getListClassToSchool(data: any){
    return this.http.get(`${environment.apiUrl}/manager/student/class_by_year`, {params: {...data}})
  }

  getListDetailAClass(data: any){
    return this.http.get(`${environment.apiUrl}/manager/class/detail`, {params: {...data}})
  }

  getListTeacherForSubject(){
    return this.http.get(`${environment.apiUrl}/manager/class/formUpdateTeacherForSubject`)
  }

  addNewSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/createSubjectForClass`, data)
  }

  updateSubject(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/updateTeacherForSubject`, data)
  }

  getTimetableData(data: any){
    // return this.http.get(`${environment.apiUrl}/manager/khoabieu`, {params: {...data}})
    return this.http.get(`${environment.apiUrl}/manager/timetable?classId=1`)
  }

  createUpdateTimetable(data: any){
    return this.http.post(`${environment.apiUrl}/manager/khoabieu/tao-sua-khoa-bieu`, data)
  }

  removeSubjectClass(data: any){
    return this.http.post(`${environment.apiUrl}/manager/class/deleteSubjectForClass`, data)
  }

  getListTeacherNotAssign(data: any){
    return this.http.get(`${environment.apiUrl}/manager/user/chooseClassToMainTearch`, {params: {...data}})
  }

  getListSubjectClassStudy(data: any){
    return this.http.get(`${environment.apiUrl}/manager/class/formCreateSubjectForClass`, {params: {...data}})
  }

  getListTeacherTosubject(data: any){
    return this.http.get(`${environment.apiUrl}/manager/class/teachers-by-subject`, {params: {...data}})
  }
}

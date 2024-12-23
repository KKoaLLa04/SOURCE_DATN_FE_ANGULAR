import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { SubjectService } from '../../services/subject.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { TIME_TABLE_STRUCT, timeTableOptionSubject } from 'src/app/_shared/utils/constant';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';

@Component({
  selector: 'app-time-table-staff',
  templateUrl: './time-table-staff.component.html',
  styleUrls: ['./time-table-staff.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    SelectComponent,
    ButtonComponent,
    ButtonBackComponent,
    RouterLink,
    Select2Component
  ]
})
export class TimeTableStaffComponent implements OnInit {
  classId: any;
  optionSubjectArray = [];
  optionSubjectArrayAfternoon = [];
  optionSubject: Select2[] = timeTableOptionSubject;
  dataRequest: any = TIME_TABLE_STRUCT;
  dataOptionsChecked: any = [];
  updatedOptions: any[] = [];
  accessType: any = 1;
  dataListMorning: any = []
  dataListAfternoon: any = [];
  periods: any = [1,2,3,4,5];
  constructor(
    private route: ActivatedRoute,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      console.log(this.classId);
      this.getListTimetable();
    });
    
  }
  onClickSubmit(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: this.classId,
      sang: this.dataRequest.sang,
      chieu: this.dataRequest.chieu
    }
    this.classStudyService.createUpdateTimetable(dataRequest).subscribe((res: any) => {
      this.showMessageService.success("Cập nhật thời khóa biểu thành công!");
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  getListStudentClassDetail(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      class_id: this.classId,
    }
    this.classStudyService.getListDetailAClass(dataRequest).subscribe((res: any) => {
      res?.data?.classSubject.map((item) => {
        this.optionSubject.push({
          label: item.subjectName,
          value: item.teacher?.classSubjectTeacherId,
        })
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  onEditTimetable(value: any, item: any){
    const dayData = this.optionSubject.find(subject => subject?.data?.subject_id == value);
    let dataRequest = {
      classId: this.classId,
      userId: dayData?.data?.user_id,
      timetableId: item.id,
      subjectId: dayData?.data?.subject_id,
      classSubjectTeacherId: dayData?.data?.class_subject_teacher_id
    }

    this.globalStore.isLoading = true;
    this.classStudyService.updateTimetable(dataRequest).subscribe((res) => {
      this.globalStore.isLoading = false;
      item.validateConfig = ''
      this.showMessageService.success("Cập nhật thời khóa biểu thành công!");
    }, (err) => {
      item.validateConfig = err.msg
      this.globalStore.isLoading = false;
    })
  }

  private getListTimetable(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: this.classId,
    }
    this.classStudyService.getTimetableData(dataRequest).subscribe((res: any) => {
      // this.dataList = res;
      res?.data?.subject_teachers?.map((item) => {
        if(item.subject_id !=0){
          this.optionSubject.push({
            label: item.subject_name + ' - ' + item.user_name,
            value: item.subject_id,
            data: item
          })
        }
      })
      this.dataListMorning = res?.data?.timetables[0]
      this.dataListAfternoon = res?.data?.timetables[1]
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  getPeriodData(day: number, period: number) {
    const dayData = this.dataListMorning.days.find(d => d.day == day);
    return dayData?.period.find(p => p.period == period);
  }
}

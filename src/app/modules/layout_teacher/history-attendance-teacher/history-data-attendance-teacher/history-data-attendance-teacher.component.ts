import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusStudentAttendanceDirective } from 'src/app/_shared/directive/status-student-attendance.directive';
import { StatusStudent } from 'src/app/_shared/enums/status-student.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MessagingService } from 'src/firebase/messaging-service';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';

@Component({
  selector: 'app-history-data-attendance-teacher',
  templateUrl: './history-data-attendance-teacher.component.html',
  styleUrls: ['./history-data-attendance-teacher.component.scss'],
  standalone: true,
  imports: [
    InputSearchComponent,
    NgFor,
    SelectComponent,
    InputComponent,
    ButtonComponent,
    FormatTimePipe,
    ButtonBackComponent,
    RouterLink,
    StatusStudentAttendanceDirective,
    GenderDirective
  ],
  providers: [FormatTimePipe]
})
export class HistoryDataAttendanceTeacherComponent implements OnInit {
dataList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  keyWord: string = ''
  date: number = 1;
  classIds: Array<number> = []
  classId: any;
  attendanceId: any;
  dataOptionsStatus: Select2[] = [
    {
      label: "Test",
      value: ""
    },
    {
      label: "Test2",
      value: ""
    }
  ]
  rollcallData: any = [];
  dateTimestampNow: any = new Date().getTime()/1000;
  attendanceEnum = StatusStudent;
  teacherTimetableId: any;
  constructor(
    private globalStore: GlobalStore,
    private attendanceSerivce: AttendanceService,
    private showMessageSerivce: ShowMessageService,
    private route: ActivatedRoute,
    private messagingSerivce: MessagingService,
    private formatTimePipe: FormatTimePipe
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
      this.teacherTimetableId = params.get('teacherId');
      if(this.teacherTimetableId && this.classId){
        this.getHistoryDataTeacher();
      }
    });
  }

  getHistoryDataTeacher(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      class_id: this.classId,
      teacher_subject_timetable_id: this.teacherTimetableId
    }

    this.attendanceSerivce.getHistoryDataTeacher(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      res.data?.data?.map((item) => {
        item.status = item.status == 0 ? 1 : item.status 
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  onChangeRadio(item: any, value: any){
    item.statusValue = value;
  }

  onChangeNote(item: any, value: string){
    item.note = value;
  }

  onSubmit(){
    this.globalStore.isLoading = true;

    let rollCallData = [];
    this.dataList.data?.data?.map((item) => {
      rollCallData.push({
        studentID: item.id,
        status: item.statusValue ? item.statusValue : item.status,
        note: item.note,
      })
    })
    let dataRequest = {
      rollcallData: rollCallData,
      date:  this.formatTimePipe.transform(this.dateTimestampNow, "yyyy-MM-dd"),
      teacher_subject_timetable_id: this.attendanceId
    }
    this.attendanceSerivce.attendanced(dataRequest, this.classId).subscribe((res) => {
      this.globalStore.isLoading = false;

      this.messagingSerivce.receiveMessaging();
      let message = this.messagingSerivce.currentMessage

      this.showMessageSerivce.success("Điểm danh thành công!");
    }, (err) => {
      this.globalStore.isLoading = false;
      this.showMessageSerivce.success("Điểm danh thành công!");
    })
  }

}

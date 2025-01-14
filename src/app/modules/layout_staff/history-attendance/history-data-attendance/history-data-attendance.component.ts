import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusStudent } from 'src/app/_shared/enums/status-student.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MessagingService } from 'src/firebase/messaging-service';
import { StatusStudentAttendanceDirective } from 'src/app/_shared/directive/status-student-attendance.directive';
import { ExportImportService } from '../../services/export-import.service';

@Component({
  selector: 'app-history-data-attendance',
  templateUrl: './history-data-attendance.component.html',
  styleUrls: ['./history-data-attendance.component.scss'],
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
    StatusStudentAttendanceDirective
  ],
  providers: [FormatTimePipe]
})
export class HistoryDataAttendanceComponent implements OnInit {
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
    private formatTimePipe: FormatTimePipe,
    private exportImportService: ExportImportService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
      this.teacherTimetableId = params.get('teacherId');
      if(this.teacherTimetableId && this.classId){
        this.getHistoryListStudentAttendance();
      }
    });
  }

  getHistoryListStudentAttendance(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      class_id: this.classId,
      teacher_subject_timetable_id: this.teacherTimetableId
    }

    this.attendanceSerivce.getHistoryListStudentAttendance(dataRequest).subscribe((res: any) => {
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

  exportAsExcel() {
    // Dữ liệu mẫu để export
    this.getListStudentAll()
  }

  private getListStudentAll(): void{
    this.globalStore.isLoading = true;

    let dataExport = [];
    this.dataList?.data?.data?.map((item, index) => {
      dataExport.push(
        {
          STT: index+1, 
          "Thông tin học sinh": `${item.fullname} - Mã: ${item.student_code}`, 
          "Lớp học": this.dataList?.data?.className, 
          "Ngày sinh": this.formatTimePipe.transform(item.dob, "dd-MM-yyyy"), 
          "Giới tính": item.gender == 1 ? "Nam": "Nữ",
          "Ghi chú": item.note,
          "Có mặt": item.status == 1 ? 'x': '',
          "Nghỉ có phép": item.status == 3 ? 'x' : '',
          "Nghỉ không phép": item.status == 2 ? 'x' : '',
          "Đi muộn": item.status == 4 ? 'x' : '',
        }
      )
    })
    this.exportImportService.exportToExcel(dataExport, 'Lịch sử điểm danh của lớp ' + this.dataList?.data?.className);
  
    this.globalStore.isLoading = false;
  }
}

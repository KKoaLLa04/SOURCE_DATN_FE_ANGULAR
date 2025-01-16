import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusStudent } from 'src/app/_shared/enums/status-student.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/firebase/messaging-service';
import { AttendanceParentService } from '../services/attendance-parent.service';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';
import { StatusDayOfWeekDirective } from 'src/app/_shared/directive/status-day-of-week.directive';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { StatusStudentAttendanceDirective } from 'src/app/_shared/directive/status-student-attendance.directive';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';

@Component({
  selector: 'app-history-attendance',
  templateUrl: './history-attendance.component.html',
  styleUrls: ['./history-attendance.component.scss'],
  imports: [
    InputSearchComponent,
    NgFor,
    SelectComponent,
    InputComponent,
    ButtonComponent,
    FormatTimePipe,
    NoDataComponent,
    NgIf,
    StatusStudentAttendanceDirective,
    StatusDayOfWeekDirective,
    SingleDatePickerComponent
  ],
  standalone: true,
  providers: [FormatTimePipe]
})
export class HistoryAttendanceComponent implements OnInit {
  dataList: any = [];
  tabSelect: number = 1;
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
  attendanceEnum = StatusStudent
  constructor(
    private globalStore: GlobalStore,
    private attendanceParentService: AttendanceParentService,
    private showMessageSerivce: ShowMessageService,
    private route: ActivatedRoute,
    private messagingSerivce: MessagingService,
    private formatTimePipe: FormatTimePipe
  ) { }

  ngOnInit() {
    this.getHistoryAttendance();
  }

  onChangeSelect(value: number): void{
    this.tabSelect = value;
  }

  getHistoryAttendance(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      studentId: localStorage.getItem('child_id'),
      date: this.formatTimePipe.transform(this.dateTimestampNow, "yyyy-MM-dd")
    }

    this.attendanceParentService.getListHistoryParent(dataRequest).subscribe((res: any) => {
      this.dataList = res;
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

  onSearchDate(event: any){
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.dateTimestampNow = event;
    this.getHistoryAttendance();
  }
}

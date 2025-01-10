import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { StatusStudentAttendanceDirective } from 'src/app/_shared/directive/status-student-attendance.directive';
import { StatusDayOfWeekDirective } from 'src/app/_shared/directive/status-day-of-week.directive';
import { StatusStudent } from 'src/app/_shared/enums/status-student.enum';
import { MessagingService } from 'src/firebase/messaging-service';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';

@Component({
  selector: 'app-history-detail-attendance',
  templateUrl: './history-detail-attendance.component.html',
  styleUrls: ['./history-detail-attendance.component.scss'],
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
export class HistoryDetailAttendanceComponent implements OnInit {
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
    dateTimestampNow: number = new Date().getTime()/1000;
    attendanceEnum = StatusStudent
    
    constructor(
      private globalStore: GlobalStore,
      private attendanceService: AttendanceService,
      private showMessageSerivce: ShowMessageService,
      private route: ActivatedRoute,
      private messagingSerivce: MessagingService,
      private formatTimePipe: FormatTimePipe
    ) { }
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
          this.getHistoryAttendance();
      });
    }
  
    onChangeSelect(value: number): void{
      this.tabSelect = value;
    }
  
    onChangeDate(date: any): void{
      this.dateTimestampNow = date;
      this.getHistoryAttendance();
    }

    getHistoryAttendance(): void{
      this.globalStore.isLoading = true;
  
      let dataRequest = {
        classId: this.classId,
        date: this.formatTimePipe.transform(this.dateTimestampNow, "yyyy-MM-dd"),
        size: this.pageSize,
        page: this.pageIndex,
        keyword: this.keyWord
      }
  
      this.attendanceService.getHistoryAttendance(dataRequest).subscribe((res: any) => {
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

}

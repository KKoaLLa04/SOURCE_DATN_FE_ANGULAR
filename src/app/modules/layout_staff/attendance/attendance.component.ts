import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { Router } from '@angular/router';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  standalone: true,
  imports: [
    Select2Component,
    InputSearchComponent,
    NgFor,
    ButtonComponent,
    SelectComponent,
    NoDataComponent,
    NgIf,
    FormatTimePipe,
    SingleDatePickerComponent,
    StatusClassAttendanceDirective
  ],
  providers: [FormatTimePipe]
})
export class AttendanceComponent implements OnInit {
  dataList: any = [];
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  keyWord: string = ''
  date: number = new Date().getTime() / 1000;
  nowTimestamp: any = new Date().getTime() / 1000;
  classIds: Array<number> = []
  dataArray: any = [];
  dataOptionsStatus: Select2[] = [
    {
      label: "Test",
      value: ""
    },
    {
      label: "Test",
      value: ""
    }
  ]
  constructor(
    private globalStore: GlobalStore,
    private attendanceSerivce: AttendanceService,
    private showMessageSerivce: ShowMessageService,
    private formatTimePipe: FormatTimePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListAttendance();
  }

  onSearchDate(event: any){
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.date = event;
    this.getListAttendance();
  }

  onSearch(event: string): void{
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyWord = event;
    this.getListAttendance();
  }

  getListAttendance(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      pageIndex: this.pageIndex,
      pageSize: 40,
      keyWord: this.keyWord,
      date: this.formatTimePipe.transform(this.date, 'yyy-MM-dd'),
      classIds: this.classIds
    }
    this.attendanceSerivce.getListAttendance(dataRequest).subscribe((res: any) => {
      let data = Object.values(res?.data)
      this.dataArray = [];
      data.map((item: any) => {
        let timeTableMorning = item.timetable[1] ? item.timetable[1] : [];
        let timeTableAfternoon = item.timetable[2] ? item.timetable[2] : [];
        this.dataArray.push({
          classId: item.ClassId,
          className: item.ClassName,
          morning: timeTableMorning,
          afternoon: timeTableAfternoon,
        })
        console.log(this.dataArray);
      })
      // for (const element of res?.data) {
      //     console.log(element);
      // }
      this.dataList = res.data;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  onChangeSaveAttendancePage(id: number, attendance_id): void{
    this.router.navigateByUrl(`staff/list_attendance/save/${id}/${attendance_id}`)
  }
}

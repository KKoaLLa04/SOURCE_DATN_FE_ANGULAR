import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { Router, RouterLink } from '@angular/router';
import { AttendanceService } from '../services/attendance.service';
import { FcmService } from 'src/app/fcm.service';
import { generateToken, messaging } from 'src/firebase/firebase';
import { onMessage } from '@angular/fire/messaging';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';

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
    StatusClassAttendanceDirective,
    StatusClassDirective,
    PaginationComponent,
    RouterLink
  ],
  providers: [FormatTimePipe]
})
export class AttendanceComponent implements OnInit {
  dataList: any = [];
      iconSvg = iconSVG;
      keyWord: string = '';
      pageIndex = PAGE_INDEX_DEFAULT;
      pageSize = PAGE_SIZE_DEFAULT;
      collectionSize: number = 0;
      sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
      dataOptionsStatus: Select2[] = [
        {
          label: "Test",
          value: ""
        },
      ]
      constructor(
        private globalStore: GlobalStore,
        private showMessageSerivce: ShowMessageService,
        private attendanceService: AttendanceService,
        private router: Router,
      ) { }
    
      ngOnInit() {
        this.getListDataClasses();
      }
    
      paginationChange(event: any) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getListDataClasses();
      }
    
      onChangeTimetable(classId: any): void{
        this.router.navigateByUrl(`staff/class-study/timetable/${classId}`)
      }
    
      onChangeDetailPage(classId: any): void{
        this.router.navigateByUrl(`staff/class-study/detail/${classId}`)
      }
    
      onChangeAssignStudentPage(classId: any): void{
        this.router.navigateByUrl(`staff/class-study/assign-student/${classId}`)
      }
    
      onSearch(value: string): void{
        this.pageIndex = PAGE_INDEX_DEFAULT;
        this.pageSize = PAGE_SIZE_DEFAULT
        this.keyWord = value;
        this.getListDataClasses()
      }
    
      private getListDataClasses(): void{
        this.globalStore.isLoading = true;
        this.attendanceService.getListClassTeacher().subscribe((res: any) => {
          this.dataList = res;
          this.collectionSize = res?.data.totalItems;
          this.globalStore.isLoading = false;
        }, (err) =>{
          this.showMessageSerivce.error(err);
        })
      }
}

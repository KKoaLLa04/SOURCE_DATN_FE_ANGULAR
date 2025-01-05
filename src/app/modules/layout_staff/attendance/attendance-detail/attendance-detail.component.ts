import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { AttendanceService } from '../../services/attendance.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss'],
  standalone: true,
  imports: [
    InputSearchComponent,
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    FormatTimePipe,
    StatusClassAttendanceDirective,
    PaginationComponent,
    ButtonBackComponent,
    RouterLink
  ],
  providers: [FormatTimePipe]
})
export class AttendanceDetailComponent implements OnInit {
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
    dateTimestampNow: number = new Date().getTime()/1000;
    classId: any;
    constructor(
      private globalStore: GlobalStore,
      private showMessageSerivce: ShowMessageService,
      private attendanceService: AttendanceService,
      private router: Router,
      private route: ActivatedRoute,
      private formatTimePipe: FormatTimePipe
    ) { }
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
          this.getDataTimetable();
      });
    }
  
    paginationChange(event: any) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getDataTimetable();
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
      this.getDataTimetable()
    }
  
    private getDataTimetable(): void{
      this.globalStore.isLoading = true;
      let dataRequest = {
        classId: this.classId,
        date: this.formatTimePipe.transform(this.dateTimestampNow, "yyyy-MM-dd")
      }
      this.attendanceService.listAttendanceTimetable(dataRequest).subscribe((res: any) => {
        this.dataList = res;
        this.collectionSize = res?.data.totalItems;
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }
}

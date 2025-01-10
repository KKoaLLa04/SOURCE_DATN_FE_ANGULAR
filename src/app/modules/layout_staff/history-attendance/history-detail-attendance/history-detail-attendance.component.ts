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

@Component({
  selector: 'app-history-detail-attendance',
  templateUrl: './history-detail-attendance.component.html',
  styleUrls: ['./history-detail-attendance.component.scss'],
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
export class HistoryDetailAttendanceComponent implements OnInit {
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
      date: this.formatTimePipe.transform(this.dateTimestampNow, "yyyy-MM-dd"),
      keyword: '',
      pageIndex: 1,
      pageSize: 1000
    }
    this.attendanceService.getHistoryAttendance(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

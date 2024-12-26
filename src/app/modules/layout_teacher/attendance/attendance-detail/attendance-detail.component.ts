import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { Select2 } from 'src/app/_models/gengeral/select2.model';

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
        date: this.dateTimestampNow
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

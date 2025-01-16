import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { GlobalStore } from 'src/app/_store/global.store';
import { StatisticAttendanceService } from '../../services/statistic-attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StatusStudentDirective } from 'src/app/_shared/directive/status-student.directive';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { RangeDatePickerComponent } from 'src/app/_shared/components/range-date-picker/range-date-picker.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';

@Component({
  selector: 'app-statistic-detail-attendance',
  templateUrl: './statistic-detail-attendance.component.html',
  styleUrls: ['./statistic-detail-attendance.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    StatusStudentDirective,
    SingleDatePickerComponent,
    ButtonBackComponent,
    RouterLink,
    RangeDatePickerComponent,
    SelectComponent,
    NgIf,
  ],
  providers: [FormatTimePipe]
})
export class StatisticDetailAttendanceComponent implements OnInit {
  dataList: any = [];
  dataDateMonth: any;
  date = new Date().getTime() / 1000;
  minDateSearch = this.date - 1300000;
  maxDateSearch = this.date + 1300000;
  dataOptionsStatus: Select2[] = [
    {
      label: "Buổi sáng",
      value: 1,
      selected: true
    },
    {
      label: "Buổi chiều",
      value: 2
    }
  ]
  statusTime: number = 1;
  classId: any;
  nowTimestamp: any = new Date().getTime() / 1000;
  endDate: any = this.nowTimestamp + 86400;
  constructor(
    private globalStore: GlobalStore,
    private statisticAttendanceSerivce: StatisticAttendanceService,
    private showMessageSerivce: ShowMessageService,
    private route: ActivatedRoute,
    private formatTimePipe: FormatTimePipe,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('id');
      this.getListStatisticData();
    });
  }

  onChangeDate(event: any){
    this.nowTimestamp = event.startDate;
    this.endDate = event.endDate
    this.getListStatisticData();
  }

  changeTimes(value){
    this.statusTime = value;
    this.getListStatisticData();
  }

  getListStatisticData(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      classId: this.classId,
      from_date: this.formatTimePipe.transform(this.nowTimestamp, "yyyy-MM-dd"),
      to_date: this.formatTimePipe.transform(this.endDate, "yyyy-MM-dd"),
      time: this.statusTime
    }
    this.statisticAttendanceSerivce.getListStatistic(dataRequest).subscribe((res: any) => {
      this.dataList = res?.data;
      this.dataDateMonth = res.data[0]?.data;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  getTooltipContent(period: any): string {
    return `Giảng viên: ${period.user_name} - môn học: ${period.subject_name}`;
  }
}

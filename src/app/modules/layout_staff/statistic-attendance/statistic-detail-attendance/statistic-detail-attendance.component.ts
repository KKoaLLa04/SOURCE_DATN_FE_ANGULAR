import { NgFor } from '@angular/common';
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
    RouterLink
  ],
  providers: [FormatTimePipe]
})
export class StatisticDetailAttendanceComponent implements OnInit {
  dataList: any = [];
  dataDateMonth: any;
  date = new Date().getTime() / 1000;
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
  classId: any;
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

  onChangeDate(date: any): void{
    this.date = date;
    this.getListStatisticData();
  }

  getListStatisticData(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      classId: this.classId,
      date: this.formatTimePipe.transform(this.date, "yyyy-MM-dd")
    }
    this.statisticAttendanceSerivce.getListStatistic(dataRequest).subscribe((res: any) => {
      this.dataList = res?.data;
      this.dataDateMonth = res.data[0]?.date;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

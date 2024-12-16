import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { StatisticAttendanceService } from '../../services/statistic-attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute } from '@angular/router';
import { StatusStudentDirective } from 'src/app/_shared/directive/status-student.directive';

@Component({
  selector: 'app-statistic-detail-attendance',
  templateUrl: './statistic-detail-attendance.component.html',
  styleUrls: ['./statistic-detail-attendance.component.scss'],
  standalone: true,
  imports: [
    Select2Component,
    InputSearchComponent,
    NgFor,
    ButtonComponent,
    SelectComponent,
    StatusStudentDirective
  ]
})
export class StatisticDetailAttendanceComponent implements OnInit {
  dataList: any = [];
  dataDateMonth: any;
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('id');
      this.getListStatisticData();
    });
  }

  getListStatisticData(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      classId: this.classId,
    }
    this.statisticAttendanceSerivce.getListStatistic(dataRequest).subscribe((res: any) => {
      this.dataList = res?.data;
      console.log(res)
      this.dataDateMonth = res.data[0]?.date;
      console.log(this.dataDateMonth)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

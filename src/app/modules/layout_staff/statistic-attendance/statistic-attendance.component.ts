import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { StatisticAttendanceService } from '../services/statistic-attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { Router } from '@angular/router';
import { StatusClassAttendanceDirective } from 'src/app/_shared/directive/status-class-attendance.directive';

@Component({
  selector: 'app-statistic-attendance',
  templateUrl: './statistic-attendance.component.html',
  styleUrls: ['./statistic-attendance.component.scss'],
  standalone: true,
  imports: [
    Select2Component,
    InputSearchComponent,
    NgFor,
    ButtonComponent,
    SelectComponent,
    StatusClassAttendanceDirective
  ]
})
export class StatisticAttendanceComponent implements OnInit {
  dataList: any = [];
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
    private statisticAttendanceSerivce: StatisticAttendanceService,
    private showMessageSerivce: ShowMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListStatisticData();
  }

  getListStatisticData(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {

    }
    this.statisticAttendanceSerivce.getListStatisticAttendance(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  onChangeStudentDetailPage(id: any){
    this.router.navigateByUrl('staff/list_attendance_statistic/detail/'+id);
  }
}

import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { TimetableService } from '../services/timetable.service';

@Component({
  selector: 'app-timetable-parent',
  templateUrl: './timetable-parent.component.html',
  styleUrls: ['./timetable-parent.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    SelectComponent,
    ButtonComponent,
    ButtonBackComponent,
    RouterLink,
  ]
})
export class TimetableParentComponent implements OnInit {
classId: any;
  optionSubjectArray = [];
  optionSubjectArrayAfternoon = [];
  dataOptionsChecked: any = [];
  updatedOptions: any[] = [];
  accessType: any = 1;
  dataListMorning: any = []
  dataListAfternoon: any = [];
  periods: any = [1,2,3,4,5];
  className: string = '';
  getConfigTimeMorning: any = [];
  getConfigTimeAfternoon: any = [];
  constructor(
    private route: ActivatedRoute,
    private globalStore: GlobalStore,
    private timetableSerivce: TimetableService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.classId = localStorage.getItem("classId")
    this.className = localStorage.getItem("className")
    this.getListTimetable();
  }

  private getListTimetable(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: this.classId,
    }
    this.timetableSerivce.getListTimetable(dataRequest).subscribe((res: any) => {
      // this.dataList = res;
      this.dataListMorning = res?.data?.timetables[0]
      this.dataListAfternoon = res?.data?.timetables[1]
      if(this.dataListMorning && this.dataListAfternoon){
        this.getConfigTimetable();
      }
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  getConfigTimetable(){
    for (let i = 0; i < 5; i++){
      this.getConfigTimeMorning[i] = {
        fromTime: this.dataListMorning.days[i].period[i].from_time,
        toTime: this.dataListMorning.days[i].period[i].to_time,
      }

      this.getConfigTimeAfternoon[i] = {
        fromTime: this.dataListAfternoon.days[i].period[i].from_time,
        toTime: this.dataListAfternoon.days[i].period[i].to_time,
      }
    }
  }

  getPeriodData(day: number, period: number) {
    const dayData = this.dataListMorning.days.find(d => d.day == day);
    return dayData?.period.find(p => p.period == period);
  }

  getPeriodDataAfternoon(day: number, period: number) {
    const dayData = this.dataListAfternoon.days.find(d => d.day == day);
    return dayData?.period.find(p => p.period == period);
  }
}
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { TimetableTeacherService } from '../services/timetable-teacher.service';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';

@Component({
  selector: 'app-timetable-teacher',
  templateUrl: './timetable-teacher.component.html',
  styleUrls: ['./timetable-teacher.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    SelectComponent,
    ButtonComponent,
    ButtonBackComponent,
    RouterLink,
    SingleDatePickerComponent,
  ]
})
export class TimetableTeacherComponent implements OnInit {
  classId: any;
  optionSubjectArray = [];
  optionSubjectArrayAfternoon = [];
  dataOptionsChecked: any = [];
  updatedOptions: any[] = [];
  accessType: any = 1;
  dataList: any = [];
  periods: any = [1,2,3,4,5];
  className: string = '';
  getConfigTimeMorning: any = [];
  getConfigTimeAfternoon: any = [];
  date: number = new Date().getTime() / 1000;
  nowTimestamp: any = new Date().getTime() / 1000;
  constructor(
    private route: ActivatedRoute,
    private globalStore: GlobalStore,
    private timetableTeacherService: TimetableTeacherService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.classId = localStorage.getItem("classId")
    this.className = localStorage.getItem("className")
    this.getListTimetable();
  }

  onSearchDate(event: any){
    this.date = event;
    this.getListTimetable();
  }

  private getListTimetable(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      date: this.date
    }
    this.timetableTeacherService.getListTimetable(dataRequest).subscribe((res: any) => {
      this.dataList = res.data.timetables;
      res.data.timetables.map((item: any) => {
        this.mapCalenderLesson(item);
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  private mapCalenderLesson(item: any){
    if(item.timetable_day == 1){
      item.timetable_day_name = "Thứ 2"
    } else if(item.timetable_day == 2){
      item.timetable_day_name = "Thứ 3"
    } else if(item.timetable_day == 3){
      item.timetable_day_name = "Thứ 4"
    } else if(item.timetable_day == 4){
      item.timetable_day_name = "Thứ 5"
    } else if(item.timetable_day == 5){
      item.timetable_day_name = "Thứ 6"
    } else if(item.timetable_day == 6){
      item.timetable_day_name = "Thứ 7"
    }
  }

  // getConfigTimetable(){
  //   for (let i = 0; i < 5; i++){
  //     this.getConfigTimeMorning[i] = {
  //       fromTime: this.dataListMorning.days[i].period[i].from_time,
  //       toTime: this.dataListMorning.days[i].period[i].to_time,
  //     }

  //     this.getConfigTimeAfternoon[i] = {
  //       fromTime: this.dataListAfternoon.days[i].period[i].from_time,
  //       toTime: this.dataListAfternoon.days[i].period[i].to_time,
  //     }
  //   }
  // }

  // getPeriodData(day: number, period: number) {
  //   const dayData = this.dataListMorning.days.find(d => d.day == day);
  //   return dayData?.period.find(p => p.period == period);
  // }

}

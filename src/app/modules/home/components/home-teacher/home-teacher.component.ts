import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeIndexService } from '../../home-index.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ]
})
export class HomeTeacherComponent implements OnInit {
needToChangePass: boolean;
  dataTeacherDay: any;
  dataTeacherWeek: any;
  dataTeacherMonth: any;
  onShowClassDay: number = 1;
  onShowClassWeek: number = 1;
  onShowClassMonth: number = 1;
  constructor(
    private homeIndexService: HomeIndexService
  ) { }

  ngOnInit(): void {
    this.needToChangePass = JSON.parse(localStorage.getItem('needToChangePass'));
    if(this.needToChangePass) {
      // open modal required change password
    }
    this.getData();
  }

  getData(): void{
    const statisticStaffDay = this.homeIndexService.getStatisticClassTeacherDayHome()
    const statisticStaffWeek= this.homeIndexService.getStatisticClassTeacherWeekHome()
    const statisticStaffMonth = this.homeIndexService.getStatisticClassTeacherMonthHome()

    forkJoin([statisticStaffDay,statisticStaffWeek,statisticStaffMonth]).subscribe(
      ([res1,res2,res3]) => {
        this.dataTeacherDay = res1;
        this.dataTeacherWeek = res2;
        this.dataTeacherMonth = res3;
      }, (err) => {

      }
    )
  }

  onShow(value: number){
    if(value == 1){
      this.onShowClassDay = 1
    }else if(value == 2){
      this.onShowClassWeek = 1
    }else if(value == 3){
      this.onShowClassMonth = 1
    }else if(value == 4){
      this.onShowClassDay = 0
    }else if(value == 5){
      this.onShowClassWeek = 0
    }else if(value == 6){
      this.onShowClassMonth = 0
    }
  }

}

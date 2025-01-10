import { Component, OnInit } from '@angular/core';
import { HomeIndexService } from '../../home-index.service';
import { forkJoin } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-index',
    templateUrl: './home-index.component.html',
    styleUrls: ['./home-index.component.scss'],
    standalone: true,
    imports: [
      NgFor,
      NgIf
    ]
})
export class HomeIndexComponent implements OnInit {
  needToChangePass: boolean;
  dataStaffDay: any;
  dataStaffWeek: any;
  dataStaffMonth: any;
  dataClassDay: any;
  dataClassWeek: any;
  dataClassMonth: any;
  onShowClassDay: number = 1;
  onShowClassWeek: number = 1;
  onShowClassMonth: number = 1;
  constructor(
    private homeIndexService: HomeIndexService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.needToChangePass = JSON.parse(localStorage.getItem('needToChangePass'));
    if(this.needToChangePass) {
      // open modal required change password
    }
    let accessType = localStorage.getItem("access_type")
    if(Number(accessType) == 2){
      this.router.navigate(['/home/index']);
    }else if(Number(accessType) == 3){
      this.router.navigate(['/parent']);
    }
    this.getData();
  }

  getData(): void{
    const statisticStaffDay = this.homeIndexService.getStatisticManagerDayHome()
    const statisticStaffWeek= this.homeIndexService.getStatisticManagerWeekHome()
    const statisticStaffMonth = this.homeIndexService.getStatisticManagerMonthHome()
    const statisticClassDay = this.homeIndexService.getStatisticClassDayHome()
    const statisticClassWeek = this.homeIndexService.getStatisticClassWeekHome()
    const statisticClassMonth = this.homeIndexService.getStatisticClassMonthHome()

    forkJoin([statisticStaffDay,statisticStaffWeek,statisticStaffMonth,statisticClassDay, statisticClassWeek, statisticClassMonth]).subscribe(
      ([res1,res2,res3,res4,res5,res6]) => {
        this.dataStaffDay = res1;
        this.dataStaffWeek = res2;
        this.dataStaffMonth = res3;
        this.dataClassDay = res4;
        this.dataClassWeek = res5;
        this.dataClassMonth = res6;
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

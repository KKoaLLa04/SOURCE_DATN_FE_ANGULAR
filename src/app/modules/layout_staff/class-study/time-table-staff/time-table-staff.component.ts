import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { SubjectService } from '../../services/subject.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { TIME_TABLE_STRUCT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-time-table-staff',
  templateUrl: './time-table-staff.component.html',
  styleUrls: ['./time-table-staff.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    SelectComponent,
    ButtonComponent
  ]
})
export class TimeTableStaffComponent implements OnInit {
  classId: any;
  dataList: any
  optionSubject: Select2[] = [
    {
      label: "chọn môn học",
      value: ""
    }
  ];
  dataRequest: any = TIME_TABLE_STRUCT;
  constructor(
    private route: ActivatedRoute,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.getListSubject();
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      this.getListTimetable();
    });
  }

  onChangeDataSubmit(value: any, calender, date,lesson){
    if(calender == "sang"){
      if(date == "hai"){
        if(lesson == 1){
          this.dataRequest.sang.hai.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.hai.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.hai.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.hai.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.hai.tiet5 = value;
        }
      }else if(calender == "ba"){
        if(lesson == 1){
          this.dataRequest.sang.ba.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.ba.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.ba.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.ba.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.ba.tiet5 = value;
        }
      }else if(calender == "tu"){
        if(lesson == 1){
          this.dataRequest.sang.tu.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.tu.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.tu.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.tu.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.tu.tiet5 = value;
        }
      }else if(calender == "nam"){
        if(lesson == 1){
          this.dataRequest.sang.nam.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.nam.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.nam.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.nam.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.nam.tiet5 = value;
        }
      }else if(calender == "sau"){
        if(lesson == 1){
          this.dataRequest.sang.sau.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.sau.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.sau.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.sau.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.sau.tiet5 = value;
        }
      }else if(calender == "bay"){
        if(lesson == 1){
          this.dataRequest.sang.bay.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.bay.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.bay.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.bay.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.bay.tiet5 = value;
        }
      }else if(calender == "chunhat"){
        if(lesson == 1){
          this.dataRequest.sang.chunhat.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.sang.chunhat.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.sang.chunhat.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.sang.chunhat.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.sang.chunhat.tiet5 = value;
        }
      }
    }

    if(calender == "chieu"){
      if(date == "hai"){
        if(lesson == 1){
          this.dataRequest.chieu.hai.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.hai.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.hai.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.hai.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.hai.tiet5 = value;
        }
      }else if(calender == "ba"){
        if(lesson == 1){
          this.dataRequest.chieu.ba.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.ba.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.ba.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.ba.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.ba.tiet5 = value;
        }
      }else if(calender == "tu"){
        if(lesson == 1){
          this.dataRequest.chieu.tu.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.tu.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.tu.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.tu.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.tu.tiet5 = value;
        }
      }else if(calender == "nam"){
        if(lesson == 1){
          this.dataRequest.chieu.nam.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.nam.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.nam.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.nam.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.nam.tiet5 = value;
        }
      }else if(calender == "sau"){
        if(lesson == 1){
          this.dataRequest.chieu.sau.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.sau.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.sau.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.sau.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.sau.tiet5 = value;
        }
      }else if(calender == "bay"){
        if(lesson == 1){
          this.dataRequest.chieu.bay.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.bay.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.bay.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.bay.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.bay.tiet5 = value;
        }
      }else if(calender == "chunhat"){
        if(lesson == 1){
          this.dataRequest.chieu.chunhat.tiet1 = value;
        }else if(lesson == 2){
          this.dataRequest.chieu.chunhat.tiet2 = value;
        }else if(lesson == 3){
          this.dataRequest.chieu.chunhat.tiet3 = value;
        }else if(lesson == 4){
          this.dataRequest.chieu.chunhat.tiet4 = value;
        }else if(lesson == 5){
          this.dataRequest.chieu.chunhat.tiet5 = value;
        }
      }
    }
    console.log(this.dataRequest);
  }

  onClickSubmit(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: this.classId,
      sang: this.dataRequest.sang,
      chieu: this.dataRequest.chieu
    }
    this.classStudyService.createUpdateTimetable(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  private getListSubject(): void{
    this.globalStore.isLoading = true;
    this.subjectService.getListSubject().subscribe((res: any) => {
      console.log(res);
      res.data.map((item) => {
        this.optionSubject.push({
          label: item.subjectName,
          value: item.subject_id
        })
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }

  private getListTimetable(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: this.classId,
    }
    this.classStudyService.getTimetableData(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageSerivce.error(err);
    })
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { ConfigTimetableService } from '../services/config-timetable.service';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-config-timetable',
  templateUrl: './config-timetable.component.html',
  styleUrls: ['./config-timetable.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    NgFor,
    NgIf,
    InputComponent,
  ]
})
export class ConfigTimetableComponent implements OnInit {
  dataList: any = [];
  dataConfigSubject: any = [];
  dataSubmit: any = [];
  flag: boolean = true;
  constructor(
    private configTimetableSerivce: ConfigTimetableService,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.getListTimetable();
    this.getListTimetableSubjectConfig();
  }

  getListTimetableSubjectConfig(): void{
    this.globalStore.isLoading = true;
    this.configTimetableSerivce.getListTimetableSubjectConfig().subscribe((res: any) => {
      console.log(res);
      this.dataConfigSubject = res?.data;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  getListTimetable(): void{
    this.globalStore.isLoading = true;


    this.configTimetableSerivce.getListTimetable().subscribe((res: any) => {
      this.dataList = Object.entries(res.data).map(([key, value]) => ({
        day: key,
        periods: value
      }));
      this.changeDataRequestFormat();

      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  onValueChangeFromTime(event: any, item: any){
    item.from_time = event.target.value
  }

  onValueChangeToTime(event: any, item: any){
    item.to_time = event.target.value
  }

  changeDataRequestFormat(){
    this.dataList.map((item) => {
      item.periods.map((data) => {
        data.time = data.period;
        data.period = item.day;
      })
    })
  }

  changeDataSubmitFormat(){
    this.dataList.map((item) => {
      item.periods.map((data: any) => {
        this.dataSubmit.push({
          period: data.time,
          time: data.period,
          from_time: data.from_time,
          to_time: data.to_time,
        })
      })
    })

    this.submitForm();
  }

  submitForm(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      data: this.dataSubmit
    }

    this.configTimetableSerivce.updateTimetable(dataRequest).subscribe((res: any) => {
      this.globalStore.isLoading = false;
      this.showMessageService.success("Cập nhật thời gian tiết học thành công");
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  validateSubmitSubjectConfig(value: any, item: any){
    if(value < 1 || value > 10){
      item.isValidate = "Số tiết trong môn học không được lớn hơn 10 và nhỏ hơn 1"
      this.flag = false;
    }else if(isNaN(Number(value))){
      item.isValidate = "Số tiết trong môn học phải là kiểu số"
      this.flag = false;
    }else{
      item.isValidate = ""
      this.flag = true;
    }

    if(!item.isValidate){
      item.quantity = value;
    }
  }

  submitFormChangeSubject(){
    this.globalStore.isLoading = true;
    console.log(this.dataConfigSubject);
    let dataSubmit = [];
    this.dataConfigSubject.map((item) => {
      dataSubmit.push({
        id: item.subjectTimetableConfigId,
        quantity: item.quantity
      })
    })
    let dataRequest = {
      data: dataSubmit
    }

    this.configTimetableSerivce.updateTimetableSubject(dataRequest).subscribe((res: any) => {
      this.globalStore.isLoading = false;
      dataSubmit = [];
      this.showMessageService.success("Cập nhật số tiết theo môn học thành công");
    }, (err) =>{
      dataSubmit = [];
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

}

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
    console.log(this.dataRequest)
    if(calender == "sang"){
      if(date == "hai"){
        this.dataRequest.sang[0]
      }else if(calender == "ba"){

      }
    }

    if(calender == "chieu"){

    }
    console.log(value);
    console.log(this.dataRequest);
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

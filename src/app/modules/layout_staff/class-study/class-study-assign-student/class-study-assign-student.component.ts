import { Component, OnInit } from '@angular/core';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { ClassStudyService } from '../../services/class-study.service';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';

@Component({
  selector: 'app-class-study-assign-student',
  templateUrl: './class-study-assign-student.component.html',
  styleUrls: ['./class-study-assign-student.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    SelectComponent,
    InputSearchComponent,
    CheckboxComponent,
    FormatTimePipe,
    NoDataComponent,
    NgFor,
    NgIf,
    ButtonComponent
  ]
})
export class ClassStudyAssignStudentComponent implements OnInit {
  dataListStudentDetail: any = []
  dataListStudentByClass: any = []
  constructor(
    private classStudyService: ClassStudyService,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.getListDetailStudentClass();
    this.getListStudentByClass();
  }

  getListStudentByClass() {
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: 2,
      keyword: '',
    }
    this.classStudyService.getListStudentByClass(dataRequest).subscribe((res: any) => {
      this.dataListStudentByClass = res;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  getListDetailStudentClass(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: 1,
      keyword: '',
    }
    this.classStudyService.getListStudentDetailClass(dataRequest).subscribe((res: any) => {
      this.dataListStudentDetail = res;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  onSubmit(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      classId: 2,
      studentsOut: [],
      studentsIn: []
    }
    this.classStudyService.addNewStudent(dataRequest).subscribe((res: any) => {
      this.showMessageService.success("Gán học sinh vào lớp học thành công");
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }
}

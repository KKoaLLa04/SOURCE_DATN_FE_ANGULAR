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
import { ActivatedRoute } from '@angular/router';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';

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
  objectIds: Set<string> = new Set();
  dataObjects: Array<string> = [];
  checkAllObject: boolean = false;
  classId: any;
  iconSvg = iconSVG
  constructor(
    private classStudyService: ClassStudyService,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      this.getListDetailStudentClass();
      this.getListStudentByClass();
    });
  }

  getListStudentByClass() {
    this.globalStore.isLoading = true;
    let dataRequest = {
      // classId: this.classId,
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
      classId: this.classId,
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
      classId: this.classId,
      studentsOut: [],
      studentsIn: Array.from(this.objectIds)
    }
    this.classStudyService.addNewStudent(dataRequest).subscribe((res: any) => {
      this.showMessageService.success("Gán học sinh vào lớp học thành công");
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  changCheckedObject(objectId: string): void{
    if(this.objectIds.has(objectId)){
      this.objectIds.delete(objectId)
    }
    else{
      this.objectIds.add(objectId)
    }

    const dataChecked = this.dataListStudentByClass.data.filter((item: any) => {return this.objectIds.has(item.id)})
    this.checkAllObject = (this.dataListStudentByClass?.data?.length !== 0 && this.objectIds.size !== 0 && dataChecked.length === this.dataListStudentByClass?.data?.length);
  }

  changeCheckAllObject(): void{
    this.checkAllObject = !this.checkAllObject
    this.dataListStudentByClass.data.forEach((item: any) => {
      if (this.checkAllObject){
          if (!this.objectIds.has(item.id)){
            this.objectIds.add(item.id);
        }else{
          if (!this.objectIds.has(item.id)){
            this.objectIds.add(item.id);
          }
        }
      }
      else{
        this.objectIds.delete(item.id)
      }
    })
    console.log(this.objectIds);
  }
}

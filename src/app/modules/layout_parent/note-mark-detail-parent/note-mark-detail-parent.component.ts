import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputNumberComponent } from 'src/app/_shared/components/input-number/input-number.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../layout_staff/services/subject.service';
import { NoteMarkParentService } from '../services/note-mark-parent.service';

@Component({
  selector: 'app-note-mark-detail-parent',
  templateUrl: './note-mark-detail-parent.component.html',
  styleUrls: ['./note-mark-detail-parent.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NoDataComponent,
    FormatTimePipe,
    ButtonComponent,
    InputNumberComponent,
    SelectComponent
  ]
})
export class NoteMarkDetailParentComponent implements OnInit {
dataList: any;
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
  classId: any;
  subject_id = 1;
  optionSubject: Select2[] = [
  ];
  className: string = '';
  dataDetail: any;
  constructor(
    private globalStore: GlobalStore,
    private noteMarkParentService: NoteMarkParentService,
    private showMessageService: ShowMessageService,
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    let dataUser = localStorage.getItem("UserInfo");
    // let dataUserJsonParse = JSON.parse(dataUser)
    this.dataDetail = JSON.parse(dataUser);
    console.log(this.dataDetail);
    this.getListSubject();
    // this.route.paramMap.subscribe((params) => {
      
    // });
    this.classId = localStorage.getItem('classId');
    if(this.classId) {
      this.className = localStorage.getItem('className')
      this.getListNoteMark();
    }
  }

  getListSubject(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      student_id: localStorage.getItem('child_id')
    }
    this.subjectService.getListSubjectForParent(dataRequest).subscribe((res: any) => {
      res.data.map((item: any) => {
        this.optionSubject.push({
          label: item.subject_name,
          value: item.subject_id,
          selected: this.subject_id == item.subject_id
        })
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  onChangeSubject(value: any){
    this.subject_id = value;
    this.getListNoteMark();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private getListNoteMark(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      student_id: localStorage.getItem('child_id'),
    }
    this.noteMarkParentService.getListNoteMark(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      // this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  onChangeEditType(item: any): void{
    item.points.isValidate = ""
    item.points.isEdit = true;
  }

  onCancelEdit(item: any): void{
    item.points.isValidate = ""
    item.points.isEdit = false;
  }

  onChangeValueInput(value: any, points: any, examPeriodIds: any){
    if(value < 0 || value > 10){
      points.isValidate = "Thang điểm 0 - 10"
    }else{
      points.isValidate = ""
    }
    points.map((item: any) => {
      if(item.exam_period_id == examPeriodIds){
        item.newPoint = Number(value);
      }
    })

    let index = points.findIndex((item) => item.exam_period_id == examPeriodIds)

    if(index == -1){
      points.push({
        exam_period_id: examPeriodIds,
        newPoint: value
      })
    }
  }

  findPoint(points: any[], examPeriodId: number): string | number {
    // Nếu không có điểm
    if (!points || points.length === 0) {
      return ''; // Nội dung mặc định
    }

    // Tìm điểm phù hợp
    const matchingPoint = points.find(
      (point) => point.exam_period_id === examPeriodId
    );

    // Trả về điểm hoặc để trống nếu không có
    return matchingPoint ? matchingPoint.point : '';
  }

}

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { NoteMarkService } from '../../services/note-mark.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { InputNumberComponent } from 'src/app/_shared/components/input-number/input-number.component';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SubjectService } from '../../services/subject.service';
import { Select2 } from 'src/app/_models/gengeral/select2.model';

@Component({
  selector: 'app-note-mark-detail',
  templateUrl: './note-mark-detail.component.html',
  styleUrls: ['./note-mark-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    NgFor,
    NgIf,
    NoDataComponent,
    FormatTimePipe,
    ButtonComponent,
    InputNumberComponent,
    SelectComponent
  ]
})
export class NoteMarkDetailComponent implements OnInit {
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
  constructor(
    private globalStore: GlobalStore,
    private noteMarkService: NoteMarkService,
    private showMessageService: ShowMessageService,
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.getListSubject();
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('id');
      this.getListNoteMark();
    });
  }

  getListSubject(){
    this.globalStore.isLoading = true;
    this.subjectService.getListSubject().subscribe((res: any) => {
      console.log(res);
      res.data.map((item: any) => {
        this.optionSubject.push({
          label: item.subjectName,
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
      size: this.pageSize,
      page: this.pageIndex,
      search: this.keyWord,
      subject_id: this.subject_id,
      class_id: this.classId
    }
    this.noteMarkService.getListNoteMarkToSubject(dataRequest).subscribe((res: any) => {
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
    points.map((item: any) => {
      if(item.exam_period_id == examPeriodIds){
        if(value < 0 || value > 10){
          item.isValidate = "Thang điểm 0 - 10";
          points.isValidate = "Thang điểm 0 - 10";
        }else{
          item.isValidate = "",
          points.isValidate = ""
        }
        item.newPoint = Number(value);
      }
    })
    console.log(points)
    let index = points.findIndex((item) => item.exam_period_id == examPeriodIds)

    if(index == -1){
      points.push({
        exam_period_id: examPeriodIds,
        newPoint: value
      })
    }
  }

  onCallApiUpdatePoints(item: any){
    let dataPoints = [];
    item.points.map((data: any) => {
      dataPoints.push({
        examPeriodId: data.exam_period_id,
        students: [
          {
            studentId: item.id,
            point: data.newPoint ? data.newPoint : data.point
          }
        ]
      })
    })

    let dataRequest: any = {
      classId: this.classId,
      subjectId: this.subject_id,
      data: dataPoints
    }

    this.globalStore.isLoading = true;

    this.noteMarkService.updateNoteMark(dataRequest).subscribe((res: any) => {
      item.points.isEdit = false;
      this.showMessageService.success("Cập nhật điểm số mới thành công");
      this.getListNoteMark();
    }, (err) =>{
      this.globalStore.isLoading = false;
      // this.showMessageService.error(err);
    })
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

  findPointValidate(points: any[], examPeriodId: number): string | number {
    // Nếu không có điểm
    if (!points || points.length === 0) {
      return ''; // Nội dung mặc định
    }

    // Tìm điểm phù hợp
    const matchingPoint = points.find(
      (point) => point.exam_period_id === examPeriodId
    );

    // Trả về điểm hoặc để trống nếu không có
    return matchingPoint ? matchingPoint.isValidate : '';
  }
}

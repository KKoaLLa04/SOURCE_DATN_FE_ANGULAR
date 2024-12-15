import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../services/class-study.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  standalone: true,
  imports: [
    SelectComponent,
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent,
    PaginationComponent,
    NoDataComponent,
    NgIf
  ]
})
export class ExamComponent implements OnInit {
  dataList: any = [];
  iconSvg = iconSVG;
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
  dataOptionsStatus: Select2[] = [
    {
      label: "Test",
      value: ""
    },
    {
      label: "Test",
      value: ""
    }
  ]
  tabActive: number = 1;
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    // private classStudyService: ClassStudyService,
    private router: Router,
    private modalService: NgbModal,
    private examSerivce: ExamService
  ) { }

  ngOnInit() {
    // this.getListDataClasses();
    this.getListExam()
    // this.getListExamTimes();
  }

  onChangePage(value){
    this.tabActive = value;
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.getListDataClasses();
    this.getListExam()
  }


  onChangeDetailPage(classId: any): void{
    this.router.navigateByUrl(`staff/note-mark/detail/${classId}`)
  }

  onChangeAssignStudentPage(classId: any): void{
    this.router.navigateByUrl(`staff/class-study/assign-student/${classId}`)
  }

  onSearch(value: string): void{
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT
    this.keyWord = value;
    // this.getListDataClasses()
    this.getListExam();
  }

  private getListExam(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: this.pageSize,
      page: this.pageIndex,
    }
    this.examSerivce.getListExam(dataRequest).subscribe((res: any) => {
      console.log(res)
      // res?.data?.data?.map((item) => {
      //   this.examSerivce.getListExamTimes(item.id);
      // })
      this.dataList = res;
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  private getListExamTimes(){
    this.globalStore.isLoading = true;
    let dataRequest = {

    }
    this.examSerivce.getListExamTimes(dataRequest).subscribe((res: any) => {
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  // private getListDataClasses(): void{
  //   this.globalStore.isLoading = true;
  //   let dataRequest = {
  //     school_year_id: localStorage.getItem('SchoolYearFirst'),
  //     size: this.pageSize,
  //     page: this.pageIndex,
  //     search: this.keyWord
  //   }
  //   this.classStudyService.getListClass(dataRequest).subscribe((res: any) => {
  //     this.dataList = res;
  //     this.collectionSize = res?.data.totalItems;
  //     this.globalStore.isLoading = false;
  //   }, (err) =>{
  //     this.showMessageSerivce.error(err);
  //   })
  // }
}

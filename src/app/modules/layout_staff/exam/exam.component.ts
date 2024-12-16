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
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamTimesFormComponent } from './exam-times-form/exam-times-form.component';

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

  create() {
    const modalRef = this.modalService.open(ExamFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm bài thi mới',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.examSerivce,
        apiSubmit: (dataInput: any) => this.examSerivce.createNewExam(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListExam();
        }
      },
      (reason) => { }
    );
  }

  update(item: any) {
    const modalRef = this.modalService.open(ExamFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Cập nhật bài thi',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: item,
        service: this.examSerivce,
        apiSubmit: (dataInput: any) => this.examSerivce.updateExam(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListExam();
        }
      },
      (reason) => { }
    );
  }

  createExamTimes() {
    const modalRef = this.modalService.open(ExamTimesFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm đợt thi mới',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.examSerivce,
        apiSubmit: (dataInput: any) => this.examSerivce.createNewTimesExam(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListExam();
        }
      },
      (reason) => { }
    );
  }

  updateTimes(item: any, examId: any) {
    const modalRef = this.modalService.open(ExamTimesFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Cập nhật đợt thi',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: item,
        exam_id: examId,
        service: this.examSerivce,
        apiSubmit: (dataInput: any) => this.examSerivce.updateTimes(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListExam();
        }
      },
      (reason) => { }
    );
  }

  private getListExam(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: this.pageSize,
      page: this.pageIndex,
    }
    this.examSerivce.getListExam(dataRequest).subscribe((res: any) => {
      console.log(res);
      this.dataList = res;
      this.collectionSize = res?.data.totalItems;
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

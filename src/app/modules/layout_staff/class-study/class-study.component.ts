import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { GlobalStore } from 'src/app/_store/global.store';
import { AcademicService } from '../services/academic.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { ClassStudyService } from '../services/class-study.service';
import { ModalFormClassStudyComponent } from './modal-form-class-study/modal-form-class-study.component';
import { ModalDeleteClassStudyComponent } from './modal-delete-class-study/modal-delete-class-study.component';
import { ModalAssignTeacherToClassComponent } from './modal-assign-teacher-to-class/modal-assign-teacher-to-class.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';

@Component({
  selector: 'app-class-study',
  templateUrl: './class-study.component.html',
  styleUrls: ['./class-study.component.scss'],
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
export class ClassStudyComponent implements OnInit {
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
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private classStudyService: ClassStudyService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getListDataClasses();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListDataClasses();
  }

  handleAction(event: IProperty): void{
    const actionHandlers = {
      '1': () => this.onChangeDetailPage(event.value),
      '2': () => this.update(event.data),
      '3': () => this.assignTeacher(event.value),
      '4': () => this.onChangeAssignStudentPage(event.value),
      '5': () => this.deleteAcademic(event.value)
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  onChangeDetailPage(classId: any): void{
    this.router.navigateByUrl(`staff/class-study/detail/${classId}`)
  }

  onChangeAssignStudentPage(classId: any): void{
    this.router.navigateByUrl(`staff/class-study/assign-student/${classId}`)
  }

  update(item: any): void{
    const modalRef = this.modalService.open(ModalFormClassStudyComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Chỉnh sửa thông tin lớp học',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: item,
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.updateClassInformation(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListDataClasses();
        }
      },
      (reason) => { }
    );
  }

  create() {
    const modalRef = this.modalService.open(ModalFormClassStudyComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm lớp học mới',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.addNewClass(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListDataClasses()
        }
      },
      (reason) => { }
    );
  }

  deleteAcademic(id: any){
    const modalRef = this.modalService.open(ModalDeleteClassStudyComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Xóa lớp học',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.globalStore.isLoading = true;
          let dataRequest = {
            class_id: id
          }
          this.classStudyService.deleteClassStudy(dataRequest).subscribe((res) => {
            this.showMessageSerivce.success("Xóa lớp học thành công");
            this.getListDataClasses();
          }, (err) => {
            this.globalStore.isLoading = false
            this.showMessageSerivce.error(err)
          })
        }
      },
      (reason) => { }
    );
  }

  assignTeacher(id: any): void{
    const modalRef = this.modalService.open(ModalAssignTeacherToClassComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Gán giáo viên chủ nhiệm',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: id,
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.assignTeacher(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListDataClasses();
        }
      },
      (reason) => { }
    );
  }

  onSearch(value: string): void{
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT
    this.keyWord = value;
    this.getListDataClasses()
  }

  private getListDataClasses(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: this.pageSize,
      page: this.pageIndex,
      search: this.keyWord
    }
    this.classStudyService.getListClass(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

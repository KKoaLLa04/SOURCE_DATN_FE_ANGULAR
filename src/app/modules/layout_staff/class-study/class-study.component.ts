import { NgFor } from '@angular/common';
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
    ContextMenuComponent
  ]
})
export class ClassStudyComponent implements OnInit {
  dataList: any = [];
  iconSvg = iconSVG
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
    this.getListStatisticData();
  }

  handleAction(event: IProperty): void{
    const actionHandlers = {
      '1': () => {},
      '2': () => this.update(),
      '3': () => this.assignTeacher(),
      '4': () => this.onChangeAssignStudentPage(),
      '5': () => this.deleteAcademic()
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  onChangeAssignStudentPage(): void{
    this.router.navigateByUrl('staff/class-study/assign-student')
  }

  update(): void{
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
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.updateClassInformation(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          console.log(result)
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
          console.log(result)
        }
      },
      (reason) => { }
    );
  }

  deleteAcademic(){
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
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.deleteClassStudy(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          console.log(result)
        }
      },
      (reason) => { }
    );
  }

  assignTeacher(): void{
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
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.assignTeacher(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          console.log(result)
        }
      },
      (reason) => { }
    );
  }

  private getListStatisticData(): void{
    this.globalStore.isLoading = true;

    this.classStudyService.getListClass().subscribe((res: any) => {
      this.dataList = res;
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

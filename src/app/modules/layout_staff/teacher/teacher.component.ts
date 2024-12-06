import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignTeacherComponent } from './modal-assign-teacher/modal-assign-teacher.component';
import { ModalChangePasswordTeacherComponent } from './modal-change-password-teacher/modal-change-password-teacher.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  standalone: true,
  imports: [
    SelectComponent,
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent
  ]
})
export class TeacherComponent implements OnInit {
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
    private teacherService: TeacherService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getListStatisticData();
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
  }

  handleAction(event: IProperty): void{
    const actionHandlers = {
      '1': () => {},
      '2': () => this.update(),
      '3': () => this.changePassWordTeacher()
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  update(): void{
    const modalRef = this.modalService.open(ModalAssignTeacherComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Chỉnh sửa thông tin công nhân viên chức',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.teacherService,
        apiSubmit: (dataInput: any) => this.teacherService.updateTeacherInformation(dataInput),
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
    const modalRef = this.modalService.open(ModalAssignTeacherComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm mới công nhân viên chức',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.teacherService,
        apiSubmit: (dataInput: any) => this.teacherService.createNewTeacher(dataInput),
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

  changePassWordTeacher(){
    const modalRef = this.modalService.open(ModalChangePasswordTeacherComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Đổi mật khẩu',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.teacherService,
        apiSubmit: (dataInput: any) => this.teacherService.createNewTeacher(dataInput),
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

  private getListStatisticData(): void{
    this.globalStore.isLoading = true;

    this.teacherService.getListTeacher().subscribe((res: any) => {
      this.dataList = res;
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

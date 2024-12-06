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
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { AcademicService } from '../services/academic.service';
import { ModalFormAcademicComponent } from './modal-form-academic/modal-form-academic.component';
import { ModalDeleteAcademicComponent } from './modal-delete-academic/modal-delete-academic.component';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss'],
  standalone: true,
  imports: [
    SelectComponent,
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent
  ]
})
export class AcademicComponent implements OnInit {
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
    private academicService: AcademicService,
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
      '3': () => this.deleteAcademic()
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  update(): void{
    const modalRef = this.modalService.open(ModalFormAcademicComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Chỉnh sửa niên khóa',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.academicService,
        apiSubmit: (dataInput: any) => this.academicService.updateAcademic(dataInput),
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
    const modalRef = this.modalService.open(ModalFormAcademicComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm niên khóa mới',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.academicService,
        apiSubmit: (dataInput: any) => this.academicService.updateAcademic(dataInput),
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
    const modalRef = this.modalService.open(ModalDeleteAcademicComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Xóa niên khóa',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.academicService,
        apiSubmit: (dataInput: any) => this.academicService.deleteAcademic(dataInput),
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

    this.academicService.getListAcademicYear().subscribe((res: any) => {
      this.dataList = res;
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { StatusClassStudentDirective } from 'src/app/_shared/directive/status-class-student.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { StudentLayoutTeacherService } from '../../services/student-layout-teacher.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignParentLayoutTeacherComponent } from '../modal-assign-parent-layout-teacher/modal-assign-parent-layout-teacher.component';
import { ModalLockUnlockParentLayoutTeacherComponent } from '../modal-lock-unlock-parent-layout-teacher/modal-lock-unlock-parent-layout-teacher.component';

@Component({
  selector: 'app-student-detail-teacher',
  templateUrl: './student-detail-teacher.component.html',
  styleUrls: ['./student-detail-teacher.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    InputComponent,
    FormatTimePipe,
    ButtonComponent,
    NgFor,
    StatusClassStudentDirective,
    NgIf,
    RouterLink
  ]
})
export class StudentDetailTeacherComponent implements OnInit {
  iconSvg = iconSVG
  studentId: any;
  dataDetail: any;
  constructor(
    private globalStore: GlobalStore,
    private studentLayoutTeacherService: StudentLayoutTeacherService,
    private route: ActivatedRoute,
    private showMessageService: ShowMessageService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      this.getDetailStudent();
    });
  }

  getDetailStudent(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      id: this.studentId
    }

    this.studentLayoutTeacherService.getStudentDetail(dataRequest).subscribe((res: any) => {
      this.dataDetail = res?.data
      console.log(res?.data);
      this.globalStore.isLoading = false;
    },(err) => {
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  assignParent(id: any): void{
    const modalRef = this.modalService.open(ModalAssignParentLayoutTeacherComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Gán Phụ huynh cho học sinh',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: id,
        service: this.studentLayoutTeacherService,
        apiSubmit: (dataInput: any) => this.studentLayoutTeacherService.assignParent(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getDetailStudent();
        }
      },
      (reason) => { }
    );
  }

  lock(item: any) {
    const modalRef = this.modalService.open(ModalLockUnlockParentLayoutTeacherComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
    
        let data = {
          titleModal: 'Khóa tài khoản phụ huynh',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            data: item,
            nameForm: 'lock',
          },
        };
    
        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.globalStore.isLoading = true;
              let dataRequest = {
                id: item.id
              }
              this.studentLayoutTeacherService.lockParent(dataRequest).subscribe((res) => {
                this.showMessageService.success("Khóa tài khoản phụ huynh thành công");
                this.getDetailStudent();
              }, (err) => {
                this.globalStore.isLoading = false
                this.showMessageService.error(err)
              })
            }
          },
          (reason) => { }
        );
  }
  
  unLock(item: any) {
    const modalRef = this.modalService.open(ModalLockUnlockParentLayoutTeacherComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
    
        let data = {
          titleModal: 'Mở khóa tài khoản phụ huynh',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            data: item,
            nameForm: 'unlock',
          },
        };
    
        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.globalStore.isLoading = true;
              let dataRequest = {
                id: item.id
              }
              this.studentLayoutTeacherService.unLockParent(dataRequest).subscribe((res) => {
                this.showMessageService.success("Mở khóa tài khoản phụ huynh thành công");
                this.getDetailStudent();
              }, (err) => {
                this.globalStore.isLoading = false
                this.showMessageService.error(err)
              })
            }
          },
          (reason) => { }
        );
  }
  
  changePassWordParent(item: any){
    // const modalRef = this.modalService.open(ModalChangePasswordComponent, {
    //   scrollable: true,
    //   windowClass: 'myCustomModalClass',
    //   keyboard: false,
    //   backdrop: 'static', // prevent click outside modal to close modal
    //   centered: false, // vị trí hiển thị modal ở giữa màn hình
    //   size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    // });

    // let data = {
    //   titleModal: 'Đổi mật khẩu',
    //   btnCancel: 'btnAction.cancel',
    //   btnAccept: 'btnAction.save',
    //   isHiddenBtnClose: false, // hidden/show btn close modal
    //   dataFromParent: {
    //     data: item,
    //     service: this.parentService,
    //     apiSubmit: (dataInput: any) => this.parentService.changePassword(dataInput),
    //     nameForm: 'create',
    //   },
    // };

    // modalRef.componentInstance.dataModal = data;
    // modalRef.result.then(
    //   (result: boolean) => {
    //     if (result) {
    //       // this.getListParent();
    //       this.globalStore.isLoading = false;
    //     }
    //   },
    //   (reason) => { 
    //     this.globalStore.isLoading = false;
    //   }
    // );
  }

}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignTeacherComponent } from './modal-assign-teacher/modal-assign-teacher.component';
import { ModalChangePasswordTeacherComponent } from './modal-change-password-teacher/modal-change-password-teacher.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { AccessTypeDirective } from 'src/app/_shared/directive/access-type.directive';
import { StatusActiveDirective } from 'src/app/_shared/directive/status-active.directive';
import { ModalAssignSubjectTeacherComponent } from './modal-assign-subject-teacher/modal-assign-subject-teacher.component';
import { ExportImportService } from '../services/export-import.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  standalone: true,
  imports: [
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent,
    NoDataComponent,
    NgIf,
    PaginationComponent,
    FormatTimePipe,
    AccessTypeDirective,
    StatusActiveDirective
  ],
  providers: [FormatTimePipe]
})
export class TeacherComponent implements OnInit {
  dataList: any = [];
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
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
    private formatTimePipe: FormatTimePipe,
    private exportImportService: ExportImportService
  ) { }

  ngOnInit() {
    this.getListTeacher();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListTeacher();
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
  }

  handleAction(event: IProperty): void{
    const actionHandlers = {
      '1': () => {},
      '2': () => this.update(event.data),
      '3': () => this.changePassWordTeacher(event.data),
      '4': () => this.onOpenModalAssignSubject(event.data)
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  update(item: any): void{
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
        data: item,
        service: this.teacherService,
        apiSubmit: (dataInput: any) => this.teacherService.updateTeacherInformation(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListTeacher()
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
          this.getListTeacher()
        }
      },
      (reason) => { }
    );
  }

  changePassWordTeacher(item: any){
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
        data: item,
        service: this.teacherService,
        apiSubmit: (dataInput: any) => this.teacherService.changePassword(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListTeacher();
        }
      },
      (reason) => { }
    );
  }

  onSearch(value: string): void{
    this.keyWord = value;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.getListTeacher();
  }

  private getListTeacher(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      keyword: this.keyWord,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }
    this.teacherService.getListTeacher(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      this.collectionSize = res?.total;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  onOpenModalAssignSubject(item: any) {
      const modalRef = this.modalService.open(ModalAssignSubjectTeacherComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'sm', // 'sm' | 'md' | 'lg' | 'xl',
      });
  
      let data = {
        titleModal: 'Gán môn học cho giáo viên',
        btnCancel: 'btnAction.cancel',
        btnAccept: 'btnAction.save',
        isHiddenBtnClose: false, // hidden/show btn close modal
        dataFromParent: {
          teacherId: item.userId,
          service: this.teacherService,
          apiSubmit: (dataInput: any) => this.teacherService.assignTeacherSubject(dataInput),
          nameForm: 'create',
        },
      };
  
      modalRef.componentInstance.dataModal = data;
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            this.getListTeacher()
          }
        },
        (reason) => { }
      );
    }
  
    // onOpenModalUpdateAssignSubject(item: any) {
    //   const modalRef = this.modalService.open(ModalAssignSubjectComponent, {
    //     scrollable: true,
    //     windowClass: 'myCustomModalClass',
    //     keyboard: false,
    //     backdrop: 'static', // prevent click outside modal to close modal
    //     centered: false, // vị trí hiển thị modal ở giữa màn hình
    //     size: 'sm', // 'sm' | 'md' | 'lg' | 'xl',
    //   });
  
    //   let data = {
    //     titleModal: 'Chỉnh môn học trong lớp',
    //     btnCancel: 'Hủy',
    //     btnAccept: 'Lưu',
    //     isHiddenBtnClose: false, // hidden/show btn close modal
    //     dataFromParent: {
    //       classId: this.classId,
    //       data: item,
    //       service: this.classStudyService,
    //       apiSubmit: (dataInput: any) => this.classStudyService.updateSubject(dataInput),
    //       nameForm: 'update',
    //     },
    //   };
  
    //   modalRef.componentInstance.dataModal = data;
    //   modalRef.result.then(
    //     (result: boolean) => {
    //       if (result) {
    //         this.getListStudentClassDetail()
    //       }
    //     },
    //     (reason) => { }
    //   );
    // }

    exportAsExcel() {
      // Dữ liệu mẫu để export
      this.getListTeacherExport()
    }
  
    private getListTeacherExport(): void{
      this.globalStore.isLoading = true;
  
      let dataExport = [];
      this.dataList?.data?.map((item, index) => {
        dataExport.push(
          {
            STT: index+1, 
            "Họ và tên": `${item.userName} - Mã: ${item.userCode}`, 
            "Email": `${item.userEmail}`,
            "Số Điện thoại": item.userPhone,
            "Lớp Học": item.userMainClassName, 
            "Môn dạy": item.subject, 
            "Chức vụ": item.userAccessType == 1 ? "Quản lý trường": "Giáo viên",
            "Trạng thái": item.userStatus == 1 ? 'Hoạt động' : "Đã khóa",
            "Ngày sinh": this.formatTimePipe.transform(item.userDob, 'dd-MM-YYY'),
          }
        )
      })
      this.exportImportService.exportToExcelTeacher(dataExport, 'Danh sách cán bộ nhân viên');
    
      this.globalStore.isLoading = false;
    }
}
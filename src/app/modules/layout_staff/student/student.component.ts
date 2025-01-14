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
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignTeacherComponent } from '../teacher/modal-assign-teacher/modal-assign-teacher.component';
import { ModalChangePasswordTeacherComponent } from '../teacher/modal-change-password-teacher/modal-change-password-teacher.component';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { StudentService } from '../services/student.service';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { ModalStudentFormComponent } from './modal-student-form/modal-student-form.component';
import { StatusClassStudentDirective } from 'src/app/_shared/directive/status-class-student.directive';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExportImportService } from '../services/export-import.service';
import { ModalImportStudentComponent } from './modal-import-student/modal-import-student.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  standalone: true,
  imports: [
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent,
    PaginationComponent,
    NoDataComponent,
    NgIf,
    StatusClassStudentDirective
  ]
})
export class StudentComponent implements OnInit {
  dataList: any = [];
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  iconSvg = iconSVG;
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
  dataExport;
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private studentService: StudentService,
    private router: Router,
    private modalService: NgbModal,
    private exportImportService: ExportImportService
  ) { }

  ngOnInit() {
    this.getListStudent();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListStudent();
  }

  onChangeStudentDetailPage(id: any){
    this.router.navigateByUrl('staff/student/detail/'+id);
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
  }

  handleAction(event: IProperty): void{
    const actionHandlers = {
      '1': () => this.onChangeStudentDetailPage(event.value),
      '2': () => this.update(event.data),
      '3': () => this.changePassWordTeacher()
    };

    const handler = actionHandlers[event.type];
    if (handler) {
      handler();
    }
  }

  update(item: any): void{
    const modalRef = this.modalService.open(ModalStudentFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Chỉnh sửa thông tin học sinh',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: item,
        service: this.studentService,
        apiSubmit: (dataInput: any) => this.studentService.updateStudentInformation(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListStudent();
        }
      },
      (reason) => { }
    );
  }

  create() {
    const modalRef = this.modalService.open(ModalStudentFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm mới học sinh',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.studentService,
        apiSubmit: (dataInput: any) => this.studentService.createNewStudent(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          // console.log(result)
          this.getListStudent();
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
        service: this.studentService,
        apiSubmit: (dataInput: any) => this.studentService.createNewStudent(dataInput),
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

  onSearch(value: string): void{
    this.keyWord = value;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.getListStudent();
  }

  exportAsExcel() {
      // Dữ liệu mẫu để export
      this.getListStudentAll()
    }

    private getListStudentAll(): void{
      this.globalStore.isLoading = true;
  
      let dataRequest = {
        keyword: this.keyWord,
        pageIndex: this.pageIndex,
        pageSize: 5000,
      }
  
      this.studentService.getListStudent(dataRequest).subscribe((res: any) => {
        this.dataExport = res;
        let dataExport = []
        res?.data.map((item, index) => {
          dataExport.push(
            {
              STT: index+1, 
              "Thông tin học sinh": `${item.fullname} - Mã: ${item.student_code}`, 
              "Lớp học": item.class_name, 
              "Giới tính": item.gender == 1 ? "Nam": "Nữ",
              "Niên khóa": item.academic_year_Name,
              "Trạng thái": item.status,
              "Phụ huynh": item.parents?.name ? item.parents?.name : item.parents,
            }
          )
        })
        this.exportImportService.exportToExcel(dataExport, 'danh-sach-hoc-sinh');
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }

  private getListStudent(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      keyword: this.keyWord,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }

    this.studentService.getListStudent(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      this.collectionSize = res?.total
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  viewImportStudent() {
    const modalRef = this.modalService.open(ModalImportStudentComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        // data: this.dataModal.dataFromParent?.data?.id,
        // dataTimetable: dataTimetable,
        // service: this.timetableService,
        // apiSubmit: (dataInput: any) => this.timetableService.createNewTimes(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    console.log(modalRef.componentInstance);
    // Nhận dữ liệu từ modal khi người dùng xác nhận
    modalRef.componentInstance.dataModalEmit.subscribe((confirmedData) => {
      console.log(confirmedData);
      let dataSubmit = {
        // category_attendance: this.dataModal.dataFromParent?.dataTimetable?.id,
        // class_id: this.dataModal.dataFromParent?.data?.id,
        // time: time,
        // periods: confirmedData
      }
      this.importDataTimetable(dataSubmit)
    });
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListStudent();
        }
      },
      (reason) => { 
        this.showMessageSerivce.error(reason);
      }
    );
  }

  importDataTimetable(dataRequest: any){
    this.globalStore.isLoading = true;
    console.log(dataRequest);
    // this.studentService.importExcelData(dataRequest).subscribe((res: any) => {
    //   this.globalStore.isLoading = false;
    //   this.showMessageSerivce.success("Import dữ liệu file excel thành công");
    // }, (err) =>{
    //   this.globalStore.isLoading = false;
    //   // this.showMessageSerivce.error(err);
    // })
  }
}

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
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private studentService: StudentService,
    private router: Router,
    private modalService: NgbModal,
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
      const data = [
        { Name: 'John', Age: 25, Gender: 'Male' },
        { Name: 'Jane', Age: 30, Gender: 'Female' }
      ];
    
      // Chuyển dữ liệu sang định dạng sheet
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
      // Tạo workbook
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Sheet1': worksheet },
        SheetNames: ['Sheet1']
      };
    
      // Xuất file Excel
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      // Lưu file
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'ExportedData.xlsx');
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
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

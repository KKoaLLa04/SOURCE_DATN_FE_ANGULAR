import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { GlobalStore } from 'src/app/_store/global.store';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { TimetableService } from '../services/timetable.service';
import { TimetableFormComponent } from './timetable-form/timetable-form.component';
import { ModalDeleteTimetableComponent } from './modal-delete-timetable/modal-delete-timetable.component';
import { ClassStudyService } from '../services/class-study.service';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';
import { ModalTimetableComponent } from './modal-timetable/modal-timetable.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    ContextMenuComponent,
    StatusClassDirective,
    PaginationComponent,
    InputSearchComponent
  ]
})
export class TimetableComponent implements OnInit {
  dataList: any = [];
  dataClass: any = [];
  iconSvg = iconSVG;
  timetableSelect: any;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
  keyWord: string = '';
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private timetableService: TimetableService,
    private router: Router,
    private modalService: NgbModal,
    private classStudyService: ClassStudyService
  ) { }

  ngOnInit() {
    this.getListTimetableTimes();
    this.getListClass();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListClass();
  }

  onSearch(value: string): void{
    this.keyWord = value;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.getListClass();
  }

  selectTimetable(data: any){
    this.timetableSelect = data;
  }

  handleAction(event: IProperty): void{
        const actionHandlers = {
          '1': () => this.update(event.data),
          '2': () => this.deleteTimetable(event.data.id)
        };
    
        const handler = actionHandlers[event.type];
        if (handler) {
          handler();
        }
      }

  create() {
    const modalRef = this.modalService.open(TimetableFormComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm đợt thời khóa biểu mới',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.timetableService,
        apiSubmit: (dataInput: any) => this.timetableService.createNewTimes(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListTimetableTimes();
        }
      },
      (reason) => { 
        this.showMessageSerivce.error(reason);
      }
    );
  }
  
  update(item: any): void{
      const modalRef = this.modalService.open(TimetableFormComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn 
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      });
      let data = {
        titleModal: 'Chỉnh sửa đợt thời khóa biểu ' + item.name,
        btnCancel: 'Hủy',
        btnAccept: 'Lưu',
        isHiddenBtnClose: false, // hidden/show btn close modal
        dataFromParent: {
          data: item,
          service: this.timetableService,
          apiSubmit: (dataInput: any) => this.timetableService.updateTimes(dataInput),
          nameForm: 'update',
        },
      };
  
      modalRef.componentInstance.dataModal = data;
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            this.getListTimetableTimes();
          }
        },
        (reason) => { }
      );
    }

  deleteTimetable(id: any){
    const modalRef = this.modalService.open(ModalDeleteTimetableComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'md', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Xóa đợt thời khóa biểu',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
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
            id: id,
          }
          this.timetableService.deleteTimes(dataRequest).subscribe((res) => {
            this.showMessageSerivce.success("Xóa đợt thời khóa biểu thành công");
            this.globalStore.isLoading = false;
            this.getListTimetableTimes();
          }, (err) => {
            this.globalStore.isLoading = false;
          })
        }
      },
      (reason) => { }
    );
  }

  viewTimetableModal(dataTimetable: any, classData: any) {
    const modalRef = this.modalService.open(ModalTimetableComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'xxl', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thời khóa biểu lớp ... tuần ...',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: classData,
        dataTimetable: dataTimetable,
        service: this.timetableService,
        apiSubmit: (dataInput: any) => this.timetableService.createNewTimes(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListTimetableTimes();
        }
      },
      (reason) => { 
        this.showMessageSerivce.error(reason);
      }
    );
  }

  private getListClass(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: this.pageSize,
      page: this.pageIndex,
      search: this.keyWord
    }
    this.classStudyService.getListClass(dataRequest).subscribe((res: any) => {
      this.dataClass = res;
      this.collectionSize = res?.data?.totalItems
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

  private getListTimetableTimes(): void{
    this.globalStore.isLoading = true;

    this.timetableService.getListTimes().subscribe((res: any) => {
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }
  
}
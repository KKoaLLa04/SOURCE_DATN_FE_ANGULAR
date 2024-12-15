import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { GlobalStore } from 'src/app/_store/global.store';
import { SchoolYearService } from '../services/school-year.service';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { StatusSchoolYearDirective } from 'src/app/_shared/directive/status-school-year.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchoolYearFormComponent } from './school-year-form/school-year-form.component';
import { statusSchoolYearEnum } from 'src/app/_shared/enums/status-school-year.enum';
import { ModalDeleteSchoolYearComponent } from './modal-delete-school-year/modal-delete-school-year.component';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    InputSearchComponent,
    FormatTimePipe,
    ContextMenuComponent,
    StatusSchoolYearDirective
  ]
})
export class SchoolYearComponent implements OnInit {
  iconSvg = iconSVG
 dataList: any = [];
  keyword: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  statusSchoolyearEnum = statusSchoolYearEnum
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private schoolYearService: SchoolYearService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getListSchoolYear();
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
  }

  handleAction(event: IProperty): void{
      const actionHandlers = {
        '1': () => this.update(event.data),
        '2': () => this.deleteSchoolYear(event?.data?.schoolYearId)
      };
  
      const handler = actionHandlers[event.type];
      if (handler) {
        handler();
      }
    }

    onSearch(value: string){
      this.keyword = value;
      this.pageIndex = PAGE_INDEX_DEFAULT;
      this.pageSize = PAGE_SIZE_DEFAULT;
      this.getListSchoolYear();
    }

    create() {
        const modalRef = this.modalService.open(SchoolYearFormComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
    
        let data = {
          titleModal: 'Thêm năm học mới',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            service: this.schoolYearService,
            apiSubmit: (dataInput: any) => this.schoolYearService.createNewSchoolyear(dataInput),
            nameForm: 'create',
          },
        };
    
        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getListSchoolYear();
            }
          },
          (reason) => { }
        );
      }

      update(item: any): void{
          const modalRef = this.modalService.open(SchoolYearFormComponent, {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            backdrop: 'static', // prevent click outside modal to close modal
            centered: false, // vị trí hiển thị modal ở giữa màn hình
            size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
          });
      
          let data = {
            titleModal: 'Chỉnh sửa năm học',
            btnCancel: 'btnAction.cancel',
            btnAccept: 'btnAction.save',
            isHiddenBtnClose: false, // hidden/show btn close modal
            dataFromParent: {
              data: item,
              service: this.schoolYearService,
              apiSubmit: (dataInput: any) => this.schoolYearService.updateSchoolyear(dataInput),
              nameForm: 'update',
            },
          };
      
          modalRef.componentInstance.dataModal = data;
          modalRef.result.then(
            (result: boolean) => {
              if (result) {
                this.getListSchoolYear();
              }
            },
            (reason) => { }
          );
        }

  deleteSchoolYear(id: any){
      const modalRef = this.modalService.open(ModalDeleteSchoolYearComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
      });
  
      let data = {
        titleModal: 'Xóa năm học',
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
              schoolYearId: id,
            }
            this.schoolYearService.deleteSchoolyear(dataRequest).subscribe((res) => {
              this.showMessageSerivce.success("Xóa năm học thành công");
              this.globalStore.isLoading = false;
              this.getListSchoolYear();
            }, (err) => {
              this.globalStore.isLoading = false;
            })
          }
        },
        (reason) => { }
      );
    }
  
  private getListSchoolYear(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      keyword: this.keyword,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }

    this.schoolYearService.getListSchoolyear(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

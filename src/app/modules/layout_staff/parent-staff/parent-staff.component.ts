import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ParentService } from '../services/parent.service';
import { Router } from '@angular/router';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';
import { StatusActiveDirective } from 'src/app/_shared/directive/status-active.directive';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalParentFormStaffComponent } from './modal-parent-form-staff/modal-parent-form-staff.component';
import { ModalChangePasswordComponent } from './modal-change-password/modal-change-password.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { ModalLockUnLockParentComponent } from './modal-lock-un-lock-parent/modal-lock-un-lock-parent.component';

@Component({
  selector: 'app-parent-staff',
  templateUrl: './parent-staff.component.html',
  styleUrls: ['./parent-staff.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    ContextMenuComponent,
    GenderDirective,
    StatusActiveDirective,
    PaginationComponent,
    InputSearchComponent
  ]
})
export class ParentStaffComponent implements OnInit {
    iconSvg = iconSVG
   dataList: any = [];
   keyword: string = '';
   pageSize = PAGE_SIZE_DEFAULT;
   pageIndex = PAGE_INDEX_DEFAULT
   sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT

   constructor(
      private globalStore: GlobalStore,
      private showMessageSerivce: ShowMessageService,
      private parentService: ParentService,
      private router: Router,
      private modalService: NgbModal
    ) { }
  
    ngOnInit() {
      this.getListParent();
    }

    onSearch(value: string){
      this.pageSize = PAGE_SIZE_DEFAULT;
      this.pageIndex = PAGE_INDEX_DEFAULT
      this.keyword = value;
      this.getListParent();
    }
  
    onChangeDetailparent(id: string): void{
      this.router.navigateByUrl(`staff/parent/${id}`);
    }

    handleAction(event: IProperty): void{
        const actionHandlers = {
          '1': () => this.onChangeDetailparent(event.value),
          '2': () => this.update(event.data),
          '3': () => this.changePassWordParent(event.data),
          '4': () => event?.data?.status == 0 ? this.unLock(event.data) : this.lock(event.data)
        };
    
        const handler = actionHandlers[event.type];
        if (handler) {
          handler();
        }
      }
    
    paginationChange(event: any) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getListParent();
    }
  
    private getListParent(): void{
      this.globalStore.isLoading = true;
      
      let dataRequest = {
        keyword: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }

      this.parentService.getListParent(dataRequest).subscribe((res: any) => {
        this.dataList = res;
        console.log(res);
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }

    update(item: any): void{
        const modalRef = this.modalService.open(ModalParentFormStaffComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
    
        let data = {
          titleModal: 'Chỉnh sửa thông tin phụ huynh',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            data: item,
            service: this.parentService,
            apiSubmit: (dataInput: any) => this.parentService.updateParent(dataInput),
            nameForm: 'update',
          },
        };
    
        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getListParent();
            }
          },
          (reason) => { }
        );
      }
    
      create() {
        const modalRef = this.modalService.open(ModalParentFormStaffComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });
    
        let data = {
          titleModal: 'Thêm mới phụ huynh',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            service: this.parentService,
            apiSubmit: (dataInput: any) => this.parentService.createNewParent(dataInput),
            nameForm: 'create',
          },
        };
    
        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              // console.log(result)
              this.getListParent();
            }
          },
          (reason) => { }
        );
      }

      lock(item: any) {
        const modalRef = this.modalService.open(ModalLockUnLockParentComponent, {
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
                  this.parentService.lockParent(dataRequest).subscribe((res) => {
                    this.showMessageSerivce.success("Khóa tài khoản phụ huynh thành công");
                    this.getListParent();
                  }, (err) => {
                    this.globalStore.isLoading = false
                    this.showMessageSerivce.error(err)
                  })
                }
              },
              (reason) => { }
            );
      }

      unLock(item: any) {
        const modalRef = this.modalService.open(ModalLockUnLockParentComponent, {
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
                  this.parentService.unLockParent(dataRequest).subscribe((res) => {
                    this.showMessageSerivce.success("Mở khóa tài khoản phụ huynh thành công");
                    this.getListParent();
                  }, (err) => {
                    this.globalStore.isLoading = false
                    this.showMessageSerivce.error(err)
                  })
                }
              },
              (reason) => { }
            );
      }

  changePassWordParent(item: any){
      const modalRef = this.modalService.open(ModalChangePasswordComponent, {
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
          service: this.parentService,
          apiSubmit: (dataInput: any) => this.parentService.changePassword(dataInput),
          nameForm: 'create',
        },
      };
  
      modalRef.componentInstance.dataModal = data;
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            // this.getListParent();
            this.globalStore.isLoading = false;
          }
        },
        (reason) => { 
          this.globalStore.isLoading = false;
        }
      );
    }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { MenuManager } from 'src/app/_models/role-manager/menu-manager.model';
import { GeneralService } from 'src/app/_services/general.service';
import { MenuManagerService } from 'src/app/_services/menu-manager/menu-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ModalAddMenuComponent } from '../../../modals/modal-add-menu/modal-add-menu.component';
import { PaginationComponent } from '../../../../../_shared/components/pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { GlobalStore } from 'src/app/_store/global.store';
import { menuTypeEnum } from 'src/app/_shared/enums/menu-type.enum';
import { activeStatusEnum } from 'src/app/_shared/enums/active-status.enum';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';

@Component({
    selector: 'app-list-menu-manager',
    templateUrl: './list-menu-manager.component.html',
    styleUrls: ['./list-menu-manager.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      FormsModule, 
      NgxPermissionsModule, 
      NgFor, 
      NgIf, 
      PaginationComponent,
      InputSearchComponent,
      ButtonComponent,
      SelectComponent
    ]
})
export class ListMenuManagerComponent implements OnInit {
  pageIndex:number = PAGE_INDEX_DEFAULT;
  pageSize:number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  menuType: any = '';
  status: any = '';
  collectionSize:number = 0;
  sizeOption:number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  dataSourceMenuItem: MenuManager[] = [];
  dataSubRoute: any;
  permission = DATA_PERMISSION;
  oldPageIndex = this.pageIndex;
  menuTypeEnum = menuTypeEnum;
  activeStatusEnum = activeStatusEnum;

  //fix cứng selectTypeArr tạm thời
  selectTypeArr: Select2[] = [
    {label:  "menuManager.menuType", value: '', selected: true},
    {label:  String(this.menuTypeEnum.CATEGORY_NAME), value: this.menuTypeEnum.CATEGORY},
    {label:  String(this.menuTypeEnum.LINK_NAME), value: this.menuTypeEnum.LINK}
  ];

  selectStatusArr: Select2[] = [
    {label:  "status", value: '', selected: true},
    {label:  String(this.activeStatusEnum.ACTIVE_NAME), value: this.activeStatusEnum.ACTIVE},
    {label:  String(this.activeStatusEnum.NO_ACTIVE_NAME), value: this.activeStatusEnum.NO_ACTIVE},
  ]

  columns = [
    {
      name: translate('STT'),
      className: "text-center w-4"
    },
    {
      name: "Icon",
      className: "text-center w-4"
    },
    {
      name: translate('menuManager.menuName'),
      className: "text-left-th w-17 ps-10"
    },
    {
      name: translate('menuManager.menuCode'),
      className: "text-left-th w-15"
    },
    {
      name: translate('menuManager.menuType'),
      className: "text-left-th w-15"
    },
    {
      name: translate('menuManager.link'),
      className: "text-left-th w-15"
    },
    {
      name: translate('status'),
      className: "text-center w-10"
    },
    {
      name: translate('menuManager.activity'),
      className: "text-center w-15"
    }
  ];
  startDate = "1651718978";
  endDate = "1653965378";
  currentDate = "1653706178";
  timePicker: boolean = true;

  constructor(
    private modalService: NgbModal,
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private generalService: GeneralService,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(): void {
    this.getDataMenuItem();
  }

  getDataMenuItem() {
    this.globalStore.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.globalStore.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.globalStore.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.menuManagerService.getListMenuItem(this.keyWord, this.status, this.menuType, this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.dataSourceMenuItem = res.data?.data;
      this.collectionSize = res.data?.totalItems;
      this.globalStore.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.globalStore.isLoading = false;
    });
  }

  searchFilter(value:string) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.oldPageIndex = this.pageIndex;
    this.keyWord = value;
    this.getDataMenuItem();
  }

  filterTypeMenu(event) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.oldPageIndex = this.pageIndex;
    this.menuType = event;
    this.getDataMenuItem();
  }

  filterStatusMenu(event) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.oldPageIndex = this.pageIndex;
    this.status = event;
    this.getDataMenuItem();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataMenuItem();
  }

  getTypeMenu(value: number) {
    return value == menuTypeEnum.LINK ? translate('menuManager.link') : translate('menuManager.category');
  }

  getStatusMenu(value: number) {
    return value == 1 ? translate('active') : translate('inActive');
  }

  setDataSubRoute(name, data) {
    this.dataSubRoute = {
      name, data
    }
  }

  openModalAddMenu() {
    const modalRef = this.modalService.open(ModalAddMenuComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
      });

    let data = {
      titleModal: translate('menuManager.addMenu'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: null
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result) {
        this.getDataMenuItem();
      }
    }, (reason) => { });
  }

  openModalUpdateMenu(item) {
    const modalRef = this.modalService.open(ModalAddMenuComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
      });

    let data = {
      titleModal: translate('menuManager.updateMenu'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: item
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result) {
        this.getDataMenuItem();
      }
    }, (reason) => { });
  }

  delete(menuId: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'deleteMenu',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        role: menuId,
        dataInput: { id: menuId },
        service: this.menuManagerService,
        apiSubmit: (dataInput: any) =>
          this.menuManagerService.deleteMenuItem(menuId),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'menu-item',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getDataMenuItem();
        }
      },
      (reason) => { }
    );
  }

}

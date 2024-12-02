import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageMenuManager } from 'src/app/_models/role-manager/package-menu-manager.model';
import { MenuManagerService } from 'src/app/_services/menu-manager/menu-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, LAYOUTS, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { GeneralService } from 'src/app/_services/general.service';
import { ShowDetailSubRouteComponent } from '../../tab-menu/show-detail-sub-route/show-detail-sub-route.component';
import { DetailMenuPackageManagerComponent } from '../detail-menu-package-manager/detail-menu-package-manager.component';
import { UpdatePackageMenuManagerComponent } from '../update-package-menu-manager/update-package-menu-manager.component';
import { CeratePackageMenuManagerComponent } from '../cerate-package-menu-manager/cerate-package-menu-manager.component';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
    selector: 'app-list-package-menu-manager',
    templateUrl: './list-package-menu-manager.component.html',
    styleUrls: ['./list-package-menu-manager.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      NgIf, 
      FormsModule, 
      NgxPermissionsModule, 
      NgFor, 
      NzDropdownButtonDirective, 
      NzDropDownDirective, 
      NzDropdownMenuComponent, 
      NzMenuDirective, 
      NzMenuItemComponent, 
      CeratePackageMenuManagerComponent, 
      UpdatePackageMenuManagerComponent, 
      DetailMenuPackageManagerComponent, 
      ShowDetailSubRouteComponent,
      InputSearchComponent,
      ButtonComponent,
      ContextMenuComponent
    ]
})
export class ListPackageMenuManagerComponent implements OnInit {
  dataSubRoute: any;
  keyWord: string = '';
  checkAddMenuPackage: boolean = false;
  checkUpdateMenuPackage: boolean = false;
  checkDetailMenuPackage: boolean = false;
  menuPackageIdUpdate: string = '';
  menuPackageManagerId: string = '';
  permission = DATA_PERMISSION;
  columns = [
    {
      name: translate('STT'),
      className: "text-center w-5"
    },
    {
      name: translate('menuManager.menuPackage'),
      className: "text-left-th w-20"
    },
    {
      name: translate('menuManager.menuCode'),
      className: "text-left-th w-20"
    },
    {
      name: translate('menuManager.layoutApply'),
      className: "text-left-th w-40"
    },
    {
      name: translate('menuManager.activity'),
      className: "text-center w-15"
    }
  ];
  dataMenuPackage: PackageMenuManager[] = [];
  protected readonly dataLayout = LAYOUTS;

  constructor(
    private modalService: NgbModal,
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private generalService: GeneralService,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(): void {
    this.getDataMenuPackage();
  }

  getDataMenuPackage(value?: string) {
    this.globalStore.isLoading = true;
    if(value!==undefined){
      this.keyWord = value;
    }
    const timeoutCallAPI = setTimeout(() => {
      if (this.globalStore.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.globalStore.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.menuManagerService.getListMenuPackage(this.keyWord).subscribe((res: any) => {
      this.dataMenuPackage = res.data;
      this.globalStore.isLoading = false;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.globalStore.isLoading = false;
    });
  }

  getLayoutAppply(data) {
    let result:string = "";
    result = data.reduce(
      (strLayoutName, layoutCode, index) => strLayoutName + this.dataLayout.find(layout => layout.code == layoutCode).name + `${index < data.length - 1 ? ', ' : ''}`,
      "",
    )
    return result;
  }

  openModalAddMenu() {
    this.checkAddMenuPackage = true;
  }

  viewDetailMenuPackageManager(item: any) {
    this.menuPackageManagerId = item.id;
    this.checkDetailMenuPackage = true;
  }

  checkCreatedMenuPackage(event) {
    this.checkAddMenuPackage = false;
    if (event) {
      this.getDataMenuPackage();
    }
  }

  checkEditMenuPackage(event) {
    this.checkUpdateMenuPackage = false;
    if (event) {
      this.getDataMenuPackage();
    }
  }

  updateMenuPackage(item: any) {
    this.menuPackageIdUpdate = item.id;
    this.checkUpdateMenuPackage = true;
  }

  checkCloseDetailMenuPackage(event: any) {
    this.checkDetailMenuPackage = false;
    if (event.status == 2) {
      this.menuPackageIdUpdate = event.id;
      this.checkUpdateMenuPackage = true;
    }
  }

  deleteMenuPackage(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'menuManager.deleteMenuPackage',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {},
        service: this.menuManagerService,
        apiSubmit: (dataInput: any) =>
          this.menuManagerService.deleteMenuPackage(item.id),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'menu-package',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getDataMenuPackage();
      },
      (reason) => { }
    );
  }

}

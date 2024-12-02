import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MenuManager } from 'src/app/_models/role-manager/menu-manager.model';
import { MenuManagerService } from 'src/app/_services/menu-manager/menu-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { LAYOUTS, MESSAGE_ERROR_CALL_API, REGEX_CODE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { FieldErrorDisplayComponent } from '../../../../../_shared/components/field-error-display/field-error-display.component';
import { NgIf, NgFor } from '@angular/common';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { MultipleSelectComponent } from 'src/app/_shared/components/multiple-select/multiple-select.component';
import { InputSearchComponent } from "../../../../../_shared/components/input-search/input-search.component";

@Component({
    selector: 'app-update-package-menu-manager',
    templateUrl: './update-package-menu-manager.component.html',
    styleUrls: ['./update-package-menu-manager.component.scss'],
    standalone: true,
    imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    FieldErrorDisplayComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzTreeComponent,
    InputComponent,
    Select2Component,
    MultipleSelectComponent,
    InputSearchComponent
]
})
export class UpdatePackageMenuManagerComponent implements OnInit {
  keyWord: string = '';
  dataSourceMenuItem = [];
  dataSourceMenuTo = [];
  dataSourceTreeNZ = [];
  dataLayouts: Select2[] = LAYOUTS.map(item => ({
    label: item.name,
    value: item.code
  }));
  // menuName: string = '';
  // code: string = '';
  // layoutApply: string[] = [];
  dataChildrenSubmit: any[] = [];
  dataTitleMenu: any[] = [];
  idsDel: any[] = [];
  validateTitleMenu: any[] = [];
  checkValidateTitleMenu: boolean = false;
  formGroup!: FormGroup;

  @Input() menuPackageIdUpdate: string;
  @Output() checkEditMenuPackage = new EventEmitter<boolean>();
  @ViewChild('nzTreeComponent') nzTreeComponent!: NzTreeComponent;
  constructor(
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private translocoService:TranslocoService

  ) { }

  ngOnInit() {
    this.initForm();
    this.getListMenuItem();
    this.getDetailMenuPackage();
  }

  filterMenu(value:string){
    this.keyWord = value.trim();
    this.getListMenuItem();
  }

  getListMenuItem(loading:boolean = true) {
    this.globalStore.isLoading = loading;
    const timeoutCallAPI = setTimeout(() => {
      if (this.globalStore.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.globalStore.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.menuManagerService.getListMenuItem(this.keyWord, '', '', 9999, 1).subscribe((res: any) => {
      this.dataSourceMenuItem = res.data?.data.filter(el => el.status == 1);
      this.dataSourceMenuItem.map((el: any) => {
        el.children = [];
        el.key = el.id;
        el.title = el.name;
      });
      if (this.dataSourceMenuTo && this.dataSourceMenuTo.length > 0) {
        this.dataSourceMenuTo.forEach(element => {
          let findFindex = this.dataSourceMenuItem.findIndex(el => el.id == element.id);
          if (findFindex != -1) {
            this.dataSourceMenuItem.splice(findFindex, 1);
          }
        })
      }
      setTimeout(() => {
        this.globalStore.isLoading = false;
      }, 500);
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.globalStore.isLoading = false;
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      menuName: ['', [Validators.required, Validators.maxLength(255)]],
      code: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      layoutApply: [[], [Validators.required]],
    });
  }

  getDetailMenuPackage() {
    this.globalStore.isLoading = true;
    this.menuManagerService.getDetailMenuPackage(this.menuPackageIdUpdate).subscribe((res: any) => {
      this.formGroup.get('menuName').setValue(res.data.name);
      this.formGroup.get('code').setValue(res.data.code);
      this.formGroup.get('layoutApply').setValue(res.data.layouts);

      this.convertDataMenu(res);
      this.globalStore.isLoading = false;
    }, (_err: any) => {
      this.globalStore.isLoading = false;
    });
  }

  convertDataMenu(dataMenu: any) {
    dataMenu.data.children.forEach((element, index) => {
      // add data to dataSourceMenuTo
      this.dataSourceMenuTo.push({
        icon: element.icon,
        key: element.id,
        title: element.name,
        url: element.url,
        id: element.id,
        name: element.name,
        code: element.code,
        menuType: element.menuType,
        permissionCode: element.permissionCode,
        status: 1,
        expanded: false,
        selected: false,
        children: this.convertDataMenuRigth(dataMenu.data.children, element.id)
      });
      // delete data to dataSourceMenuItem
      let findIndex = this.dataSourceMenuItem.findIndex(el => el.id == element.id);
      if (findIndex != -1) {
        this.dataSourceMenuItem.splice(findIndex, 1);
      }
      // add data title
      this.dataTitleMenu[element.id] = element.title;
      // add data treeNZ
      if (element.parentId == "") {
        this.dataSourceTreeNZ.push({
          icon: element.icon,
          key: element.id,
          title: element.name,
          url: element.url,
          id: element.id,
          name: element.name,
          code: element.code,
          menuType: element.menuType,
          permissionCode: element.permissionCode,
          status: 1,
          expanded: false,
          selected: false,
          children: this.convertDataMenuRigth(dataMenu.data.children, element.id)
        })
      }
    });
  }

  convertDataMenuRigth(dataMenu: any, parentId: string) {
    let dataChild: any[] = [];
    dataMenu.forEach((element, index) => {
      if (element.parentId == parentId) {
        dataChild.push({
          icon: element.icon,
          key: element.id,
          title: element.name,
          url: element.url,
          id: element.id,
          name: element.name,
          code: element.code,
          menuType: element.menuType,
          permissionCode: element.permissionCode,
          status: 1,
          expanded: false,
          selected: false,
          children: this.convertDataMenuRigth(dataMenu, element.id)
        })
      }
    });
    return dataChild;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dataSourceTreeNZ = this.dataSourceTreeNZ.concat(this.dataSourceMenuTo[0]);
    }
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if (event.eventName == 'click') {
      event.node.isExpanded = true;
    }

    if (event.eventName == 'drop') {
      event.node.isExpanded = true;
      this.dataSourceTreeNZ = [];
      let currentNodeDrop = this.nzTreeComponent.getTreeNodeByKey(event.dragNode.key);
      this.nzTreeComponent.getTreeNodes().forEach(element => {
        this.dataSourceTreeNZ.push(element.origin);
      })
      if (currentNodeDrop.key) {
        currentNodeDrop.isExpanded = true;
        this.dataSourceTreeNZ.forEach(element => {
          this.deleteChildrenNode(currentNodeDrop.key, currentNodeDrop?.parentNode?.key, element);
        })
      }
    }
  }

  deleteChildrenNode(currentNodeKey, parentNodeKey, node) {
    if (node?.children && node?.children?.length > 0) {
      node?.children.forEach((subEl, index) => {
        if (subEl.key == currentNodeKey && node.key != parentNodeKey) {
          node?.children.splice(index, 1);
        }
        this.deleteChildrenNode(currentNodeKey, parentNodeKey, subEl);
      });
    }
  }

  removeMenuItem(item: NzTreeNode) {
    this.idsDel = [];
    this.getIdsDel(item);
    if (this.idsDel && this.idsDel.length > 0) {
      this.reStoreDataDel();
    }
    item.clearChildren();
    if (item.level == 0) {
      let findFindex = this.dataSourceTreeNZ.findIndex(el => el.id == item.key);
      let findFindexTree = this.nzTreeComponent.getTreeNodes().findIndex(el => el.key == item.key);
      if (findFindex != -1) {
        this.dataSourceTreeNZ.splice(findFindex, 1);
      }
      if (findFindexTree != -1) {
        this.nzTreeComponent.getTreeNodes().splice(findFindex, 1);
      }
    } else {
      item.remove();
    }
    this.getListMenuItem(false);
  }

  getIdsDel(item: any) {
    this.idsDel.push(item.key);
    if (item._children && item._children.length > 0) {
      item._children.forEach(element => {
        this.getIdsDel(element);
      });
    }
  }

  reStoreDataDel() {
    this.idsDel.forEach(element => {
      let findIndex = this.dataSourceMenuTo.findIndex(el => el.id == element);
      if (findIndex != -1) {
        this.dataSourceMenuTo[findIndex].children = [];
        this.dataSourceMenuItem.push(this.dataSourceMenuTo[findIndex]);
        this.dataSourceMenuTo.splice(findIndex, 1);
      }
    })
  }

  convertDataMenuSubmit(dataMenuTree: any, parentId: string, index: number) {
    if (dataMenuTree && dataMenuTree._children && dataMenuTree._children.length > 0) {
      this.dataChildrenSubmit.push({
        id: dataMenuTree.origin.id,
        name: dataMenuTree.origin.name,
        code: dataMenuTree.origin.code,
        url: dataMenuTree.origin.url,
        permissionCode: dataMenuTree.origin.permissionCode ? dataMenuTree.origin.permissionCode : 'permission',
        icon: dataMenuTree.origin.icon,
        menuType: dataMenuTree.origin.menuType,
        subMenu: [],
        indexOrder: index,
        parentId: parentId,
        title: this.dataTitleMenu[dataMenuTree.origin.id]
      })
      dataMenuTree._children.forEach((subElement, subIndex) => {
        if (subElement && subElement._children && subElement._children.length > 0) {
          this.convertDataMenuSubmit(subElement, dataMenuTree.origin.id, subIndex);
        } else {
          this.dataChildrenSubmit.push({
            id: subElement.origin.id,
            name: subElement.origin.name,
            code: subElement.origin.code,
            url: subElement.origin.url,
            permissionCode: subElement.origin.permissionCode ? subElement.origin.permissionCode : 'permission',
            icon: subElement.origin.icon,
            menuType: subElement.origin.menuType,
            subMenu: [],
            indexOrder: index,
            parentId: dataMenuTree.origin.id,
            title: this.dataTitleMenu[subElement.origin.id]
          })
        }
      });
    } else {
      this.dataChildrenSubmit.push({
        id: dataMenuTree.origin.id,
        name: dataMenuTree.origin.name,
        code: dataMenuTree.origin.code,
        url: dataMenuTree.origin.url,
        permissionCode: dataMenuTree.origin.permissionCode ? dataMenuTree.origin.permissionCode : 'permission',
        icon: dataMenuTree.origin.icon,
        menuType: dataMenuTree.origin.menuType,
        subMenu: [],
        indexOrder: index,
        parentId: parentId,
        title: this.dataTitleMenu[dataMenuTree.origin.id]
      })
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.saveMenuPackage();
    } else {
      this.globalStore.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  keyupDomain() {
    this.validationMessagesServer.code = '';
  }

  saveMenuPackage() {
    this.dataChildrenSubmit = [];
    this.validateTitleMenu = [];
    this.checkValidateTitleMenu = false;
    if(this.dataSourceTreeNZ.length == 0){
      this.showMessageService.warning(this.translocoService.translate('menuManager.validateCountMenuItem'));
      return;
    }
    if (this.nzTreeComponent.getTreeNodes() && this.nzTreeComponent.getTreeNodes().length > 0) {
      this.nzTreeComponent.getTreeNodes().forEach((element, index) => {
        this.convertDataMenuSubmit(element, "", index + 1);
      });
    }
    if (this.dataChildrenSubmit && this.dataChildrenSubmit.length > 0) {
      const convertData = new Promise((resolve, reject) => {
        this.dataChildrenSubmit.forEach(element => {
          if (String(element.title).trim() == '' || typeof element.title == 'undefined') {
            this.checkValidateTitleMenu = true;
            this.validateTitleMenu[element.id] = 1;
          }
        })
        resolve(true);
      })

      convertData.then((result: any) => {
        if (!this.checkValidateTitleMenu) {
          let dataInput = {
            layoutId: this.formGroup.value.layoutApply,
            name: this.formGroup.value.menuName,
            code: this.formGroup.value.code,
            children: this.dataChildrenSubmit
          }
          this.listenFireBase('update', 'menu-package');
          this.updateMenuPackage(dataInput);
        } else {
          this.showMessageService.error(translate('menuManager.validateTitleMenuInpackage'));
        }
      })
    }
  }

  updateMenuPackage(dataInput) {
    this.globalStore.isLoading = true;
    this.menuManagerService.updateMenuPackage(this.menuPackageIdUpdate, dataInput).subscribe((res: any) => {
      this.globalStore.isLoading = false;

    }, (_err: any) => {
      this.globalStore.isLoading = false;
      this.validateAllFormFieldsErrorServer(_err.errors);
    });
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.globalStore.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.globalStore.isLoading = false;
        this.checkEditMenuPackage.emit(true);
      } else {
        this.globalStore.isLoading = false;
      }
    });
  }

  cancelEditMenuPackage() {
    this.checkEditMenuPackage.emit(false);
  }

  changeTitleMenu(event, key) {
    this.dataTitleMenu[key] = event.target.value;
    if (String(event.target.value).trim() == '' || typeof event.target.value == 'undefined') {
      this.validateTitleMenu[key] = 1;
    } else {
      this.validateTitleMenu[key] = 0;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach(itemMessage => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key]
                }
              }
            }
          });
        })
      }
    });
  }

  validationMessagesServer = {
    keyWord: {},
    menuName: {},
    code: {},
    layoutApply: {},
  }

  validationMessages = {
    menuName: [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
    ],
    code: [
      { type: 'required', message: translate('requiredCode') },
      { type: 'maxlength', message: translate('maxLengthCode') },
      { type: 'pattern', message: translate('patternCode') },
    ],
    layoutApply: [
      { type: 'required', message: translate('menuManager.validators.layoutApply.required') },
    ],
  };


}

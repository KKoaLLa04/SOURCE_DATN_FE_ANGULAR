import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { REGEX_CODE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { MenuManagerService } from 'src/app/_services/menu-manager/menu-manager.service';
import { ChooseIconComponent } from '../../../../_shared/components/choose-icon/choose-icon.component';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { FieldErrorDisplayComponent } from '../../../../_shared/components/field-error-display/field-error-display.component';
import { NgIf, NgFor } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { menuTypeEnum } from 'src/app/_shared/enums/menu-type.enum';

@Component({
    selector: 'app-modal-add-menu',
    templateUrl: './modal-add-menu.component.html',
    styleUrls: ['./modal-add-menu.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      NgIf, 
      FormsModule, 
      ReactiveFormsModule, 
      NgFor, 
      FieldErrorDisplayComponent, 
      NzPopoverDirective, 
      NzCheckboxComponent, 
      ChooseIconComponent,
      ButtonComponent,
      InputComponent
    ]
})
export class ModalAddMenuComponent implements OnInit {
  @Input() dataModal: any;
  formGroup: FormGroup;
  srcImage = "";
  checkShowChooseIcon: boolean = false;
  checkTypeMenu: boolean = false;
  checkUpdate: boolean = false;
  validation_messages = {
    'name': [
      { type: 'required', message: 'menuManager.validators.name.required' },
      { type: "maxlength", message: 'maxLengthName' }
    ],
    'code': [
      { type: 'required', message: 'menuManager.validators.code.required' },
      { type: "pattern", message: 'menuManager.validators.code.pattern' },
      { type: "maxlength", message: 'maxLengthCode' }
    ],
    'permissionCode': [
      { type: 'required', message: 'menuManager.validators.permissionCode.required' },
      { type: "pattern", message: 'menuManager.validators.permissionCode.pattern' },
      { type: "maxlength", message: 'maxLengthCode' }
    ],
    'url': [
      { type: 'required', message: 'menuManager.validators.url.required' }
    ],
    'icon': [
      { type: 'required', message: 'menuManager.validators.icon.required' }
    ],
  }

  validationMessagesServer = {
    name: {},
    code: {},
    permissionCode: {},
    url: {},
    icon: {}
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private menuManagerService: MenuManagerService,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(): void {
    if (this.dataModal.dataFromParent) {
      this.checkUpdate = true;
    }
    this.initForm(this.dataModal.dataFromParent);
  }

  initForm(data = null) {
    this.srcImage = data ? data.icon : '';
    this.formGroup = this.fb.group({
      name: [data ? data.name : '', [Validators.required, Validators.maxLength(255)]],
      code: [data ? data.code : '', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      permissionCode: [data ? data.permissionCode : '', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      url: [data ? data.url : '', [Validators.required]],
      icon: [data ? data.icon : '', [Validators.required]],
      menuType: data ? data.menuType == menuTypeEnum.CATEGORY ? true : false : false,
      menuStatus: data ? data.status == 1 ? true : false : true
    })
    if (data) {
      data.menuType == menuTypeEnum.CATEGORY ? this.checkChangeMenuType(true) : this.checkChangeMenuType(false);
    }
  }

  checkChangeMenuType(event) {
    console.log(event);
    if (event) {
      this.formGroup.controls["url"].clearValidators();
      this.formGroup.controls["url"].updateValueAndValidity();
    } else {
      this.formGroup.controls["url"].setValidators([Validators.required]);
      this.formGroup.controls["url"].updateValueAndValidity();
    }
  }

  closeModal() {
    this.activeModal.close(false);
  }

  clickChooseIcon() {
    this.checkShowChooseIcon = true;
  }

  checkChooseIcon(event: any) {
    this.checkShowChooseIcon = false;
    this.srcImage = event.item;
    this.formGroup.get('icon').setValue(this.srcImage);
  }

  submitForm() {
    this.globalStore.isLoading = true;
    if (this.formGroup.valid) {
      this.saveForm();
    } else {
      this.globalStore.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  keyupCode() {
    this.validationMessagesServer.code = "";
  }

  saveForm() {
    let dataInput = {
      name: this.formGroup.value.name,
      code: this.formGroup.value.code,
      url: this.formGroup.value.url,
      icon: this.formGroup.value.icon,
      menuType: this.formGroup.value.menuType ? menuTypeEnum.CATEGORY : menuTypeEnum.LINK,
      status: this.formGroup.value.menuStatus ? 1 : 0,
      permissionCode: this.formGroup.value.permissionCode
    }
    if (this.checkUpdate) {
      this.listenFireBase('update', 'menu-item');
      this.updateMenu(dataInput, this.dataModal.dataFromParent.id);
    } else {
      this.listenFireBase('create', 'menu-item');
      this.createMenu(dataInput);
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

  createMenu(dataInput) {
    this.globalStore.isLoading = true;
    this.menuManagerService.storeMenuItem(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessage.error(res.msg);
        this.globalStore.isLoading = false;
      }
      else {
        this.globalStore.isLoading = false;
      }
    }, (_err: any) => {
      this.globalStore.isLoading = false;
      this.validateAllFormFieldsErrorServer(_err.errors);
    });
  }

  updateMenu(dataInput: any, menuId: string) {
    this.globalStore.isLoading = true;
    this.menuManagerService.updateMenuItem(dataInput, menuId).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessage.error(res.msg);
        this.globalStore.isLoading = false;
      }
      else {
        this.globalStore.isLoading = false;
      }
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
        this.activeModal.close(true);
      } else {
        this.globalStore.isLoading = false;
      }
    });
  }

}

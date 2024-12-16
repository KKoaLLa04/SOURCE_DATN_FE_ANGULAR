import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { REGEX_CODE } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-modal-change-password-teacher',
  templateUrl: './modal-change-password-teacher.component.html',
  styleUrls: ['./modal-change-password-teacher.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    SingleDatePickerComponent
  ]
})
export class ModalChangePasswordTeacherComponent implements OnInit {
  @Input() dataModal: any;
  formGroup: FormGroup;
  dataFromParent: any;
  validationMessagesServer = {
    name: {},
    code: {},
    requestLayout: {}
  };
  isUpdate: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    console.log(this.dataFromParent)
    this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      confirm_password: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
    });
  }

  submit(valueForm: any) {

    if (this.formGroup.valid) {
      let dataInput = {
        userId: this.dataFromParent.data?.userId,
        userPassword: valueForm.password.trim(),
      };
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => { 
          this.showMessageService.success("Đổi mật khẩu thành công")
        },
        (err: any) => {
          this.globalStore.isLoading = false;
          this.validateAllFormFieldsErrorServer(err.errors);
        }
      );
    } else {
      this.globalStore.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
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

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  validationMessages = {
    password: [
      {
        type: "required",
        message: 'requiredName'
      },
      {
        type: "maxlength",
        message: 'maxLengthName'
      },
    ],
    confirm_password: [
      {
        type: "required",
        message: 'requiredCode'
      },
      {
        type: "maxlength",
        message: 'maxLengthCode'
      },
    ],
  };

}

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
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
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      code: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.code
          : '',
        [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)],
      ],
      requestLayout: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.layout
          : null,
        [Validators.required, ValidatorNotNull],
      ],
      desc: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.description
          : '',
      ],
    });
  }

  submit(valueForm: any) {
    if (this.formGroup.valid) {
      let dataInput = {
        name: valueForm.name.trim(),
        code: valueForm.code.trim(),
        requestLayout: valueForm.requestLayout,
        description: valueForm.desc,
      };
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput['id'] = this.dataFromParent?.role?.id;
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => { },
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
    name: [
      {
        type: "required",
        message: 'requiredName'
      },
      {
        type: "maxlength",
        message: 'maxLengthName'
      },
      {
        type: "notEmpty",
        message: 'requiredName'
      }
    ],
    code: [
      {
        type: "required",
        message: 'requiredCode'
      },
      {
        type: "maxlength",
        message: 'maxLengthCode'
      },
      {
        type: "pattern",
        message: 'patternCode'
      }
    ],
    requestLayout: [
      {
        type: "notNull",
        message: 'role.requiredLayout'
      },
    ]
  };

}

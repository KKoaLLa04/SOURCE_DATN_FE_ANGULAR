import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { REGEX_CODE, REGEX_PHONE } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-modal-assign-teacher',
  templateUrl: './modal-assign-teacher.component.html',
  styleUrls: ['./modal-assign-teacher.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    SingleDatePickerComponent,
    SingleFormDatePickerComponent
  ]
})
export class ModalAssignTeacherComponent implements OnInit {
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
          ? this.dataFromParent?.data?.name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      email: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.code
          : '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      phone: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
        [Validators.required, Validators.pattern(REGEX_PHONE)],
      ],
      role: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
        [Validators.required],
      ],
      password: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      confirm_password: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      mainTeacher: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
      ],
      address: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
      ],
      dob: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : '',
      ],
      active: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.phone
          : 1,
      ],
    },
    {Validators: this.passwordMatchValidator}
  );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm_password = form.get('confirm_password')?.value;

    if (confirm_password && password && confirm_password === password) {
      return { passwordMatchValidator: true };
    }
    return null;
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
    email: [
      {
        type: "required",
        message: 'requiredEmail'
      },
      {
        type: "maxlength",
        message:'maxLengthEmail'
      },
      {
        type: "email",
        message: 'invalidEmail'
      }
    ]

  };

}

import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { accessTypeEnum } from 'src/app/_shared/enums/access-type.enum';
import { genderEnum } from 'src/app/_shared/enums/gender.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { REGEX_PHONE } from 'src/app/_shared/utils/constant';
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
    SingleFormDatePickerComponent,
    SelectComponent,
    NgIf
  ],
  providers: [FormatTimePipe]
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
  timestampNow: number = new Date().getTime() /1000 ;
  optionRoles: Select2[] = [
    {
      label: "Chọn chức vụ",
      value: "",
      selected: true
    },
    {
      label: String(accessTypeEnum.MANAGER_LABEL),
      value: accessTypeEnum.MANAGER
    },
    {
      label: String(accessTypeEnum.TEACHER_LABEL),
      value: accessTypeEnum.TEACHER,
    },
    {
      label: String(accessTypeEnum.GUARDIAN_LABEL),
      value: accessTypeEnum.GUARDIAN
    }
  ]
  optionTeachers: Select2[] = [
    {
      label: "Chọn giáo viên chủ nhiệm",
      value: '',
      selected: true
    }
  ]
  optionGender: Select2[] = [
    {
      label: "Chọn giới tính",
      value: '',
      selected: true
    },
    {
      label: "Nam",
      value: genderEnum.NAM
    },
    {
      label: "Nữ",
      value: genderEnum.WOMAN
    },
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private formatTimePipe: FormatTimePipe,
    private showMessageService: ShowMessageService
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
          ? this.dataFromParent?.data?.userName
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      username: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userUserName
          : '',
        [Validators.required],
      ],
      email: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userEmail
          : '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      phone: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userPhone
          : '',
        [Validators.required, Validators.pattern(REGEX_PHONE)],
      ],
      role: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userAccessType
          : '',
        [Validators.required],
      ],
      gender: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.gender
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
          ? this.dataFromParent?.data?.userMainClassId
          : '',
      ],
      address: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.address
          : '',
      ],
      dob: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userDob
          : this.timestampNow,
      ],
      active: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.userStatus
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
    if(this.dataFromParent.nameForm == 'update'){
      this.formGroup.get('password').clearValidators();
      this.formGroup.get('password').updateValueAndValidity();
      this.formGroup.get('confirm_password').clearValidators();
      this.formGroup.get('confirm_password').updateValueAndValidity();
      this.formGroup.get('username').clearValidators();
      this.formGroup.get('username').updateValueAndValidity();
    }
    if (this.formGroup.valid) {
      let dataInput: any = {
        userName: valueForm.name.trim(),
        userUsername: valueForm.username.trim(),
        userEmail: valueForm.email.trim(),
        userPhone: valueForm.phone.trim(),
        classId: valueForm.mainTeacher,
        userAccessType: valueForm.role,
        userStatus: valueForm.active,
        userDob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
        userAddress: valueForm.address,
        userGender: valueForm.gender,
        userPassword: valueForm.password,
      };

      if(valueForm.password != valueForm.confirm_password){
        return;
      }
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput = {
          userId: this.dataFromParent.data.userId,
          userName: valueForm.name.trim(),
          userEmail: valueForm.email.trim(),
          userPhone: valueForm.phone.trim(),
          classId: valueForm.mainTeacher,
          userAccessType: valueForm.role,
          userStatus: valueForm.active,
          userDob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
          userAddress: valueForm.address,
          userGender: valueForm.gender,
        };
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          this.globalStore.isLoading = false;
          this.showMessageService.success(res?.msg)
          this.activeModal.close(true);
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
    username: [
      {
        type: "required",
        message: "usernameRequired"
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
    ],
    phone: [
      {
        type: "required",
        message: "phoneRequired"
      },
      {
        type: "pattern",
        message: "phonePattern"
      }
    ],
    role: [
      {
        type: "required",
        message: "requiredRole"
      }
    ],
    password: [
      {
        type: "required",
        message: "requiredPassword"
      }
    ],
    confirm_password: [
      {
        type: "required",
        message: "confirmPasswordRequired"
      }
    ],
    gender: [
      {
        type: "required",
        message: "requiredGender"
      }
    ]
  };

}

import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { activeStatusEnum } from 'src/app/_shared/enums/active-status.enum';
import { genderEnum } from 'src/app/_shared/enums/gender.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from 'src/app/modules/layout_staff/services/class-study.service';

@Component({
  selector: 'app-modal-update-parent-layout-teacher',
  templateUrl: './modal-update-parent-layout-teacher.component.html',
  styleUrls: ['./modal-update-parent-layout-teacher.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    SingleFormDatePickerComponent,
    NgIf
  ],
  providers: [FormatTimePipe]
})
export class ModalUpdateParentLayoutTeacherComponent implements OnInit {
  @Input() dataModal: any;
  formGroup: FormGroup;
  dataForm: any
  dataFromParent: any;
  validationMessagesServer = {
    name: {},
    code: {},
    requestLayout: {}
  };
  isUpdate: boolean = false;
  nowTimestamp: number = new Date().getTime()/1000 - 86400;
  optionStatus: Select2[] = [
    {
      label: "Chọn trạng thái phụ huynh",
      value: '',
      selected: true
    },
    {
      label: "Hoạt động",
      value: activeStatusEnum.ACTIVE
    },
    {
      label: "Khóa tài khoản",
      value: activeStatusEnum.ACTIVE
    },
  ]

  optionsGender: Select2[] = [
    {
      label: "Chọn giới tính",
      value: ""
    },
    {
      label: "Nam",
      value: genderEnum.NAM
    },
    {
      label: "Nữ",
      value: genderEnum.WOMAN
    }
  ]


  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private showMessageService: ShowMessageService,
    private formatTimePipe: FormatTimePipe
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;

    console.log(this.dataFromParent)
    this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
    this.initForm();
  }

  initForm() {
    console.log(this.dataFromParent?.data);
    this.formGroup = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      username: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_username
          : '',
        [Validators.required],
      ],
      status: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_status
          : '',
        [Validators.required],
      ],
      phone: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_phone
          : '',
        [Validators.required],
      ],
      email: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_email
          : '',
        [Validators.required],
      ],
      dob: [
        this.dataFromParent.nameForm == 'update'
          ? this.convertToTimestamp(this.dataFromParent?.data?.parents_dob)
          : '',
        [Validators.required],
      ],
      address: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_address
          : '',
      ],
      gender: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.parents_gender
          : '',
          [Validators.required],
      ],
    });

  }

  convertToTimestamp(dateString: string): number {
    return Math.floor(new Date(dateString).getTime() / 1000);
  }

  submit(valueForm: any) {
    if (this.formGroup.valid) {
      let dataInput;
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput = {
          id: this.dataFromParent.data.parents_id,
          fullname: valueForm.name.trim(),
          phone: valueForm.phone,
          dob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
          gender: valueForm.gender,
          status: valueForm.status,
          email: valueForm.email,
          address: valueForm.address,
          career: valueForm.career,
        };
      }else{
        dataInput = {
          fullname: valueForm.name.trim(),
          phone: valueForm.phone,
          dob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
          gender: valueForm.gender,
          status: valueForm.status,
          email: valueForm.email,
          address: valueForm.address,
          career: valueForm.career,
          username: valueForm.username,
          password: valueForm.password,
          confirm_password: valueForm.confirmPassword,
        };
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          if (this.dataFromParent.nameForm == 'update') {
            this.showMessageService.success("Cập nhật phụ huynh thành công")
          }else{
            this.showMessageService.success("Thêm phụ huynh mới thành công")
          }
          this.globalStore.isLoading = false;
          this.closeModal(true)
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
    name: [
      {
        type: "required",
        message: 'Tên bắt buộc nhập'
      },
    ],
    status: [
      {
        type: "required",
        message: 'Trạng thái bắt buộc chọn'
      },
    ],
    dob: [
      {
        type: "required",
        message: 'Ngày sinh bắt buộc chọn'
      },
    ],
    username: [
      {
        type: "required",
        message: 'Tên đăng nhập bắt buộc nhập'
      },
    ],
    password: [
      {
        type: "required",
        message: 'Mật khẩu bắt buộc chọn'
      },
    ],
    confirmPassword: [
      {
        type: "required",
        message: 'Xác nhận mật khẩu bắt buộc chọn'
      },
    ],
    phone: [
      {
        type: "required",
        message: 'Số điện thoại bắt buộc nhập'
      },
    ],
    email: [
      {
        type: "required",
        message: 'Email bắt buộc nhập'
      },
    ],
    gender: [
      {
        type: "required",
        message: 'Giới tính bắt buộc chọn'
      },
    ], 
  };

}

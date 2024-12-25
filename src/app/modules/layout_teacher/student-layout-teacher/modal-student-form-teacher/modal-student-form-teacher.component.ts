import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { genderEnum } from 'src/app/_shared/enums/gender.enum';
import { statusClassStudentEnum } from 'src/app/_shared/enums/status-class-student.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { StudentTeacherService } from '../../services/student-teacher.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';

@Component({
  selector: 'app-modal-student-form-teacher',
  templateUrl: './modal-student-form-teacher.component.html',
  styleUrls: ['./modal-student-form-teacher.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    SingleFormDatePickerComponent
  ],
  providers: [FormatTimePipe]
})
export class ModalStudentFormTeacherComponent implements OnInit {
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
  nowTimestamp: any = new Date().getTime()/1000 - 86400 - 86400;
  disabledOptionClasses: boolean = false;
  optionStatus: Select2[] = [
    {
      label: "Chọn trạng thái học sinh",
      value: '',
      selected: true
    },
    {
      label: "Đang học",
      value: statusClassStudentEnum.STUDYING
    },
    {
      label: "Chưa vào lớp",
      value: statusClassStudentEnum.NOT_YET_CLASS
    }
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
    private showMessageService: ShowMessageService,
    private formatTimePipe: FormatTimePipe
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    if(this.dataFromParent.nameForm === "update"){
      this.optionStatus.push(
        {
          label: "Nghỉ học",
          value: statusClassStudentEnum.LEAVE
        },
      )
    }
    console.log(this.dataFromParent)
    this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.fullname
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      status: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.status
          : '',
        [Validators.required],
      ],
      gender: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.gender
          : '',
        [Validators.required],
      ],
      class: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.class_id
          : '',
      ],
      dob: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.dob
          : this.nowTimestamp,
        [Validators.required],
      ],
      address: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.address
          : '',
      ],
    });

  }

  submit(valueForm: any) {
    if (this.formGroup.valid) {
      let dataInput;
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput = {
          id: this.dataFromParent.data.id,
          fullname: valueForm.name,
          address: valueForm.address,
          dob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
          gender: valueForm.gender,
          status: valueForm.status,
          // class_id: valueForm.status == statusClassStudentEnum.NOT_YET_CLASS ? '' : valueForm.class,
        };
      }else{
        dataInput = {
          fullname: valueForm.name,
          address: valueForm.address,
          dob: this.formatTimePipe.transform(valueForm.dob, 'yyy-MM-dd'),
          gender: valueForm.gender,
          status: valueForm.status,
          class_id: localStorage.getItem("classIdTeacher"),
        };
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          if (this.dataFromParent.nameForm == 'update') {
            this.showMessageService.success("Cập nhật học sinh thành công")
          }else{
            this.showMessageService.success("Thêm học sinh mới thành công")
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
    gender: [
      {
        type: "required",
        message: 'Giới tính bắt buộc chọn'
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
  };
}

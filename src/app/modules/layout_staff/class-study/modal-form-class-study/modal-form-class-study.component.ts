import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusClassEnum } from 'src/app/_shared/enums/status-class.enum';
import { REGEX_CODE } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-modal-form-class-study',
  templateUrl: './modal-form-class-study.component.html',
  styleUrls: ['./modal-form-class-study.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent
  ]
})
export class ModalFormClassStudyComponent implements OnInit {
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

  optionStatus: Select2[] = [
    {
      label: "Chọn trạng thái lớp học",
      value: '',
      selected: true
    },
    {
      label: "Chưa diễn ra",
      value: StatusClassEnum.HAS_NOT_HAPPENDED
    },
    {
      label: "Đang diễn ra",
      value: StatusClassEnum.HAS_APPROVED
    },
    {
      label: "Đã kết thúc",
      value: StatusClassEnum.HAS_NOT_HAPPENDED
    }
  ]

  optionGrades: Select2[] = [
    {
      label: "Chọn khối",
      value: ""
    }
  ]

  optionMainTeacher: Select2[] = [
    {
      label: "Giáo viên chủ nhiệm",
      value: ''
    }
  ]

  optionAcacdemic: Select2[] = [
    {
      label: "Niên khóa",
      value: ''
    }
  ]

  optionSchoolYear: Select2[] = [
    {
      label: "Năm học",
      value: ''
    }
  ]



  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.getDataForm();
    this.dataFromParent = this.dataModal.dataFromParent;
    this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
    this.initForm();
  }


  getDataForm(): void{
    this.globalStore.isLoading = true;
    this.classStudyService.getDataForm().subscribe((res: any) => {
      this.dataForm = res;
      console.log(res);
      res.data.academics.map((item) => {
        this.optionAcacdemic.push({
          label: item.name,
          value: item.id
        })
      })

      res.data.grades.map((item) => {
        this.optionGrades.push({
          label: item.name,
          value: item.id
        })
      })

      res.data.teachers.map((item) => {
        this.optionMainTeacher.push({
          label: item.name,
          value: item.id
        })
      })

      res.data.schoolYears.map((item) => {
        this.optionSchoolYear.push({
          label: item.name,
          value: item.id
        })
      })

      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      academic: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.academic_id
          : '',
        [Validators.required],
      ],
      mainTeacher: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.teacher_id
          : '',
      ],
      grade: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.grade_id
          : '',
        [Validators.required],
      ],
      schoolYear: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.school_year_id
          : '',
        [Validators.required],
      ],
      status: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.status
          : '',
        [Validators.required],
      ],
    });

    if(this.dataFromParent.nameForm == 'update'){
      this.formGroup.get('academic').clearValidators();
      this.formGroup.get('academic').updateValueAndValidity();
      this.formGroup.get('schoolYear').clearValidators();
      this.formGroup.get('schoolYear').updateValueAndValidity();
    }
  }

  submit(valueForm: any) {
    if(this.dataFromParent.nameForm == 'update'){
      this.formGroup.get('academic').clearValidators();
      this.formGroup.get('academic').updateValueAndValidity();
      this.formGroup.get('schoolYear').clearValidators();
      this.formGroup.get('schoolYear').updateValueAndValidity();
    }
    if (this.formGroup.valid) {
      let dataInput;
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput = {
          class_id: this.dataFromParent.data.id,
          name: valueForm.name.trim(),
          teacher_id: valueForm.mainTeacher,
          status: valueForm.status,
          grade_id: valueForm.grade,
        };
      }else{
        dataInput = {
          name: valueForm.name.trim(),
          academic_id: valueForm.academic,
          teacher_id: valueForm.mainTeacher,
          status: valueForm.status,
          grade_id: valueForm.grade,
          school_year_id: valueForm.schoolYear,
        };
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          if (this.dataFromParent.nameForm == 'update') {
            this.showMessageService.success("Cập nhật lớp học thành công")
          }else{
            this.showMessageService.success("Thêm lớp học mới thành công")
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
        message: 'requiredName'
      },
    ],
    academic: [
      {
        type: "required",
        message: 'Niên khóa bắt buộc chọn'
      },
    ],
    grade: [
      {
        type: "required",
        message: 'Khối học bắt buộc chọn'
      },
    ],
    schoolYear: [
      {
        type: "required",
        message: 'Năm học bắt buộc chọn'
      },
    ],
    status: [
      {
        type: "required",
        message: "Trạng thái bắt buộc chọn"
      }
    ]
  };
}

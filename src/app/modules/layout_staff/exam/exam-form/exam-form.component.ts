import { PAGE_INDEX_DEFAULT } from './../../../../_shared/utils/constant';
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
import { statusSchoolYearEnum } from 'src/app/_shared/enums/status-school-year.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { SchoolYearService } from '../../services/school-year.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
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
export class ExamFormComponent implements OnInit {

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
    optionScopeScore: Select2[] =[
      {
        label: "Chọn hệ số điểm",
        value: '',
        selected: true
      },
      {
        label: "Hệ số 1",
        value: 1
      },
      {
        label: "Hệ số 2",
        value: 2
      },
      {
        label: "Hệ số 3",
        value: 3
      }
    ]

    optionSchoolYear: Select2[] = [
      {
        label: "Chọn năm học",
        value: '',
        selected: true
      }
    ];

    constructor(
      public activeModal: NgbActiveModal,
      private fb: FormBuilder,
      private globalStore: GlobalStore,
      private showMessageService: ShowMessageService,
      private formatTimePipe: FormatTimePipe,
      private schoolYearService: SchoolYearService
    ) { }

    ngOnInit(): void {
      this.dataFromParent = this.dataModal.dataFromParent;
      this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
      this.getListSchoolYear();
      this.initForm();
    }

    initForm() {
      this.formGroup = this.fb.group({
        name: [
          this.dataFromParent.nameForm == 'update'
            ? this.dataFromParent?.data?.name
            : '',
          [Validators.required, ValidatorNotEmptyString],
        ],
        status: [
          this.dataFromParent.nameForm == 'update'
            ? this.dataFromParent?.data?.point
            : '',
          [Validators.required],
        ],
        date: [
          this.dataFromParent.nameForm == 'update'
            ? this.dataFromParent?.data?.schoolYearId
            : '',
          [Validators.required],
        ],
      });
    }

    submit(valueForm: any) {
      if (this.formGroup.valid) {
        let dataInput = {
          name: valueForm.name.trim(),
          school_year_id: valueForm.date,
          point: valueForm.status
        };
        if (this.dataFromParent.nameForm == 'update') {
          // form update
          dataInput['exam_id'] = this.dataFromParent?.data?.id;
        }
        this.globalStore.isLoading = true;

        this.dataFromParent.apiSubmit(dataInput).subscribe(
          (res: any) => {
            if(this.dataFromParent.nameForm == 'update'){
              this.showMessageService.success("Cập nhật bài kiểm tra thành công");
            }else{
              this.showMessageService.success("Thêm mới bài kiểm tra thành công");
            }
            this.closeModal(true);
            this.globalStore.isLoading = false;
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
          message: 'Tên bài thi không được bỏ trống'
        },
      ],
      status: [
        {
          type: "required",
          message: 'Hệ số điểm bắt buộc chọn'
        },
      ],
      date: [
        {
          type: "required",
          message: 'Năm học bắt buộc chọn'
        },
      ],
    };

    private getListSchoolYear(){
      this.globalStore.isLoading = true;
    let dataRequest = {
      keyword: '',
      size: 100,
      page: PAGE_INDEX_DEFAULT,
    }
    this.schoolYearService.getListSchoolyear(dataRequest).subscribe((res: any) => {
      res?.data?.map((item) => {
        this.optionSchoolYear.push({
          label: item?.schoolYearName,
          value: item?.schoolYearId
        })
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
    })
    }
}

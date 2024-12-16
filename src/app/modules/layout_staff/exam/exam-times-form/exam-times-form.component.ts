import { ExamService } from './../../services/exam.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { SchoolYearService } from '../../services/school-year.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { PAGE_INDEX_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-exam-times-form',
  templateUrl: './exam-times-form.component.html',
  styleUrls: ['./exam-times-form.component.scss'],
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
export class ExamTimesFormComponent implements OnInit {

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

      optionExams: Select2[] = [
        {
          label: "Chọn bài thi",
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
        private schoolYearService: SchoolYearService,
        private examSerivce: ExamService
      ) { }

      ngOnInit(): void {
        this.dataFromParent = this.dataModal.dataFromParent;
        this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
        this.getListExam();
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
          exam: [
            this.dataFromParent.nameForm == 'update'
              ? this.dataFromParent?.exam_id
              : '',
            [Validators.required],
          ],
          date: [
            this.dataFromParent.nameForm == 'update'
              ? this.convertToEpoch(this.dataFromParent?.data?.date)
              : this.timestampNow,
            [Validators.required],
          ],
        });
      }

      convertToEpoch(dateString: string): number {
        // Tạo một đối tượng Date từ chuỗi ngày
        const date = new Date(dateString);

        // Trả về timestamp dạng Epoch (theo giây)
        return Math.floor(date.getTime() / 1000);
      }

      submit(valueForm: any) {
        if (this.formGroup.valid) {
          let dataInput = {
            name: valueForm.name.trim(),
            exam_id: valueForm.exam,
            date: Number(valueForm.date)
          };
          if (this.dataFromParent.nameForm == 'update') {
            // form update
            dataInput['exam_period_id'] = this.dataFromParent?.exam_id;
          }
          this.globalStore.isLoading = true;

          this.dataFromParent.apiSubmit(dataInput).subscribe(
            (res: any) => {
              if(this.dataFromParent.nameForm == 'update'){
                this.showMessageService.success("Cập nhật đợt thi thành công");
              }else{
                this.showMessageService.success("Thêm mới đợt thi thành công");
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
        date: [
          {
            type: "required",
            message: 'Thời gian đợt thi bắt buộc chọn'
          },
        ],
        exam: [
          {
            type: "required",
            message: 'Bài thi bắt buộc chọn'
          },
        ],
      };

  private getListExam(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: 100,
      page: 1,
    }
    this.examSerivce.getListExam(dataRequest).subscribe((res: any) => {
      res?.data?.data.map((item) => {
        this.optionExams.push({
          label: item?.name,
          value: item?.id
        })
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
    })
  }
}

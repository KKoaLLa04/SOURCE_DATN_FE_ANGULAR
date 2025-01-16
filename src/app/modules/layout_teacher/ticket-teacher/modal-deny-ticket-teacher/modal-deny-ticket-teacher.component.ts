import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { RangeDatePickerComponent } from 'src/app/_shared/components/range-date-picker/range-date-picker.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { TextareaComponent } from 'src/app/_shared/components/textarea/textarea.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from 'src/app/modules/layout_staff/services/class-study.service';
import { SubjectService } from 'src/app/modules/layout_staff/services/subject.service';

@Component({
  selector: 'app-modal-deny-ticket-teacher',
  templateUrl: './modal-deny-ticket-teacher.component.html',
  styleUrls: ['./modal-deny-ticket-teacher.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    RangeDatePickerComponent,
    TextareaComponent
  ],
  providers: [FormatTimePipe]
})
export class ModalDenyTicketTeacherComponent implements OnInit {

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
  
    optionTeachers: Select2[] = [
      {
        label: "Chọn giáo viên giảng dạy",
        value: ""
      }
    ]
  
    optionSubjects: Select2[] = [
      {
        label: "Chọn môn học",
        value: ""
      }
    ]
    nowTimestamp: any = new Date().getTime() / 1000;
    endDate: any = this.nowTimestamp + 86400;
    fullname: string = '';
    childName: string = ''
  
    constructor(
      public activeModal: NgbActiveModal,
      private fb: FormBuilder,
      private globalStore: GlobalStore,
      private classStudyService: ClassStudyService,
      private showMessageService: ShowMessageService,
      private subjectService: SubjectService,
      private formatTime: FormatTimePipe
    ) { }
  
    ngOnInit(): void {
      this.fullname = localStorage.getItem('fullname');
      this.childName = localStorage.getItem('child_name');
  
      this.dataFromParent = this.dataModal.dataFromParent;
      this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
      this.initForm();
    }
  
  
    getDataForm(): void{
      this.globalStore.isLoading = true;
      this.classStudyService.getListTeacherForSubject().subscribe((res: any) => {
        console.log(res);
        res.data.map((item) => {
          this.optionTeachers.push({
            label: item.name,
            value: item.id
          })
        })
  
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageService.error(err);
      })
    }
  
    getListSubject(){
      this.globalStore.isLoading = true;
      this.subjectService.getListSubject().subscribe((res: any) => {
        console.log(res);
        res.data.map((item) => {
          this.optionSubjects.push({
            label: item.subjectName,
            value: item.subject_id
          })
        })
  
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageService.error(err);
      })
    }
  
    initForm() {
      this.formGroup = this.fb.group({
        reason: [
          this.dataFromParent.nameForm == 'update'
            ? this.dataFromParent?.data?.reason
            : '',
          [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
        ],
      });
    }
  
    submit(valueForm: any) {
      if (this.formGroup.valid) {
         let dataInput = {
          id: this.dataFromParent?.data?.id,
          refuse_note: valueForm.reason,
        };
  
        this.globalStore.isLoading = true;
  
        this.dataFromParent.apiSubmit(dataInput).subscribe(
          (res: any) => {
            if (this.dataFromParent.nameForm == 'update') {
              // this.showMessageService.success("Cập nhật môn học của lớp học thành công")
            }else{
              this.showMessageService.success("Từ chối đơn xin nghỉ thành công")
            }
            this.globalStore.isLoading = false;
            this.closeModal(true)
           },
          (err: any) => {
            this.globalStore.isLoading = false;
            this.validateAllFormFieldsErrorServer(err.errors);
          }
        );
            this.closeModal(true)
  
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
  
    onChangeDate(event: any){
      this.nowTimestamp = event.startDate;
      this.endDate = event.endDate
    }
  
    validationMessages = {
      reason: [
        {
          type: "required",
          message: 'Lý do từ chối bắt buộc nhập'
        },
      ],
    };

}

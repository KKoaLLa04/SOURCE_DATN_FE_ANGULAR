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
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss'],
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
export class SubjectFormComponent implements OnInit {
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
     optionsStatus: Select2[] =[
       {
         label: "Chọn trạng thái năm học",
         value: ''
       },
       {
         label: "Chưa diễn ra",
         value: statusSchoolYearEnum.NOT_STARTED_YET
       },
       {
         label: "Đang diễn ra",
         value: statusSchoolYearEnum.ONGOING
       },
       {
         label: "Đã kết thúc",
         value: statusSchoolYearEnum.FINISHED
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
       this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
       this.initForm();
     }
   
     initForm() {
      console.log(this.dataFromParent);
       this.formGroup = this.fb.group({
         name: [
           this.dataFromParent.nameForm == 'update'
             ? this.dataFromParent?.data?.schoolYearName
             : '',
           [Validators.required, ValidatorNotEmptyString],
         ],
         status: [
           this.dataFromParent.nameForm == 'update'
             ? this.dataFromParent?.data?.schoolYearStatus
             : '',
           [Validators.required],
         ],
         start_date: [
           this.dataFromParent.nameForm == 'update'
             ? this.dataFromParent?.data?.schoolYearStartDate
             : this.timestampNow,
           [Validators.required],
         ],
         end_date: [
           this.dataFromParent.nameForm == 'update'
             ? this.dataFromParent?.data?.schoolYearEndDate
             : this.timestampNow,
           [Validators.required],
         ],
       });
     }
   
     submit(valueForm: any) {
       if (this.formGroup.valid) {
         let dataInput = {
           schoolYearName: valueForm.name.trim(),
           schoolYearStatus: valueForm.status,
         };
         if (this.dataFromParent.nameForm == 'update') {
           // form update
           dataInput['schoolYearId'] = this.dataFromParent?.data?.schoolYearId;
         }else{
           dataInput['schoolYearStartDate'] = this.formatTimePipe.transform(valueForm.start_date, 'yyy-MM-dd');
           dataInput['schoolYearEndDate'] = this.formatTimePipe.transform(valueForm.end_date, 'yyy-MM-dd');
         }
         this.globalStore.isLoading = true;
   
         this.dataFromParent.apiSubmit(dataInput).subscribe(
           (res: any) => {
             if(this.dataFromParent.nameForm == 'update'){
               this.showMessageService.success("Cập nhật năm học thành công");
             }else{
               this.showMessageService.success("Thêm mới năm học mới thành công");
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
           message: 'requiredName'
         },
       ],
       status: [
         {
           type: "required",
           message: 'requiredStatus'
         },
       ],
       start_date: [
         {
           type: "required",
           message: 'requiredStartDate'
         },
       ],
       end_date: [
         {
           type: "required",
           message: 'requiredEndDate'
         },
       ]
     };
}

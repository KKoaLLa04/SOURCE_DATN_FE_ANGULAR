import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { SingleFormDatePickerComponent } from 'src/app/_shared/components/single-form-date-picker/single-form-date-picker.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.scss'],
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
export class TimetableFormComponent implements OnInit {
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
    const fromDateString = this.dataFromParent?.data?.from_date; // Định dạng MM/DD/YYYY
    const toDateString = this.dataFromParent?.data?.to_date; // Định dạng MM/DD/YYYY
    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);
     this.formGroup = this.fb.group({
       name: [
         this.dataFromParent.nameForm == 'update'
           ? this.dataFromParent?.data?.name
           : '',
         [Validators.required, ValidatorNotEmptyString],
       ],
       start_date: [
         this.dataFromParent.nameForm == 'update'
           ? Math.floor(fromDate.getTime() / 1000)
           : this.timestampNow,
         [Validators.required],
       ],
       end_date: [
         this.dataFromParent.nameForm == 'update'
           ? Math.floor(toDate.getTime() / 1000)
           : this.timestampNow,
         [Validators.required],
       ],
     });
   }
 
   submit(valueForm: any) {
     if (this.formGroup.valid) {
       let dataInput = {
         name: valueForm.name,
         from_date: this.formatTimePipe.transform(valueForm.start_date, 'yyy-MM-dd'),
         to_date: this.formatTimePipe.transform(valueForm.end_date, 'yyy-MM-dd')
       };
       if (this.dataFromParent.nameForm == 'update') {
         // form update
         dataInput['id'] = this.dataFromParent?.data?.id;
       }
       
       this.globalStore.isLoading = true;
 
       this.dataFromParent.apiSubmit(dataInput).subscribe(
         (res: any) => {
           if(this.dataFromParent.nameForm == 'update'){
             this.showMessageService.success("Cập nhật đợt thời khóa biểu thành công");
           }else{
             this.showMessageService.success("Thêm mới đợt thời khóa biểu thành công");
           }
           this.closeModal(true);
           this.globalStore.isLoading = false;
         },
         (err: any) => {
           this.globalStore.isLoading = false;
           this.showMessageService.error(err.msg);
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
         message: 'Tên năm học'
       },
     ],
     status: [
       {
         type: "required",
         message: 'Trạng thái năm học bắt buộc chọn'
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

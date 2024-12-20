import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { LoadingComponent } from 'src/app/_shared/components/loading/loading.component';
import { SingleDatePickerComponent } from 'src/app/_shared/components/single-date-picker/single-date-picker.component';
import { MESSAGE_ERROR_CALL_API, REGEX_PASSWORD, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
  standalone: true,
  imports: [
      TranslocoModule,
      FormsModule,
      ReactiveFormsModule,
      InputComponent,
      ButtonComponent,
      CheckboxComponent,
      SingleDatePickerComponent
    ]
})
export class ModalChangePasswordComponent implements OnInit {
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
     private showMessageService: ShowMessageService
   ) { }
 
   ngOnInit(): void {
     this.dataFromParent = this.dataModal.dataFromParent;
     console.log(this.dataFromParent)
     this.isUpdate = this.dataFromParent.nameForm === "update" ? true : false;
     this.initForm();
   }
 
   initForm() {
     this.formGroup = this.fb.group({
       password: [
         '',
         [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
       ],
       confirm_password: [
         '',
         [Validators.required, Validators.maxLength(50)],
       ],
     });
   }
 
   submit(valueForm: any) {
 
     if (this.formGroup.valid) {
       let dataInput = {
         id: this.dataFromParent.data?.id,
         password: valueForm.password,
         confirm_password: valueForm.confirm_password,
       };
       console.log(dataInput)
       this.globalStore.isLoading = true;
 
       this.dataFromParent.apiSubmit(dataInput).subscribe(
         (res: any) => { 
           this.showMessageService.success("Đổi mật khẩu thành công")
           this.closeModal(true);
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
     password: [
       {
         type: "required",
         message: 'Mật khẩu bắt buộc nhập'
       },
       {
         type: "maxlength",
         message: 'Độ dài mật khẩu vượt quá ký tự'
       },
     ],
     confirm_password: [
       {
         type: "required",
         message: 'Xác nhận mật khẩu bắt buộc nhập'
       },
       {
         type: "maxlength",
         message: 'Độ dài xác nhận mật khẩu vượt quá ký tự'
       },
     ],
   };
 

}

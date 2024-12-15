import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-modal-assign-subject',
  templateUrl: './modal-assign-subject.component.html',
  styleUrls: ['./modal-assign-subject.component.scss'],
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
export class ModalAssignSubjectComponent implements OnInit {
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

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private showMessageService: ShowMessageService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getDataForm();
    this.getListSubject();
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
      subject: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.subject
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      teacher: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.data?.teacher
          : '',
        [Validators.required],
      ],
    });
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
          class_id: Number(this.dataFromParent.classId),
          subject_id: Number(valueForm.subject),
          teacher_id: Number(valueForm.teacher),
        };
      }else{
        dataInput = {
          class_id: Number(this.dataFromParent.classId),
          subject_id: Number(valueForm.subject),
          teacher_id: Number(valueForm.teacher),
        };
      }
      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          if (this.dataFromParent.nameForm == 'update') {
            this.showMessageService.success("Cập nhật môn học của lớp học thành công")
          }else{
            this.showMessageService.success("Thêm môn học vào lớp thành công")
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
    subject: [
      {
        type: "required",
        message: 'Môn học bắt buộc chọn'
      },
    ],
    teacher: [
      {
        type: "required",
        message: 'Chọn giáo viên giảng dạy'
      },
    ],
  };
}

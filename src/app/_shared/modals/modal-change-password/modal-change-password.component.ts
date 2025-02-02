import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { REGEX_PASSWORD } from './../../utils/constant';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgTemplateOutlet, NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
@Component({
    selector: 'app-modal-change-password',
    templateUrl: './modal-change-password.component.html',
    styleUrls: ['./modal-change-password.component.scss'],
    standalone: true,
    imports: [TranslocoModule, FormsModule, ReactiveFormsModule, NgTemplateOutlet, NgIf, LoadingComponent]
})
export class ModalChangePasswordGlobalComponent implements OnInit {

  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  password = '';
  confirmPassword = '';
  changePassword: FormGroup;
  isShowPassword = false;
  isShowConfirmPassword = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.initForm();
  }

  initForm() {
    this.changePassword = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern(REGEX_PASSWORD)
        ]),
      ],
      confirmPassword: ['', Validators.compose([Validators.required])],
    });
  }

  showPassword(typeInput: string) {
    if (typeInput == 'password') this.isShowPassword = !this.isShowPassword;
    if (typeInput == 'confirm-password')
      this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  submit(valueChange: any) {
    if (this.changePassword.invalid) {
      return;
    }
    let inputChangePassword = {
      userId: this.dataFromParent.userId,
      password: valueChange.password,
      confirmedPassword: valueChange.confirmPassword,
    };

    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule);
    this.dataFromParent.apiSubmit(inputChangePassword).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.isLoading = false;
          this.showMessage.error(res.msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

}

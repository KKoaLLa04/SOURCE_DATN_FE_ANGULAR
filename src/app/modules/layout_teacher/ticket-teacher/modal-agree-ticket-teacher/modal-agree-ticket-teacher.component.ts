import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';

@Component({
  selector: 'app-modal-agree-ticket-teacher',
  templateUrl: './modal-agree-ticket-teacher.component.html',
  styleUrls: ['./modal-agree-ticket-teacher.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ]
})
export class ModalAgreeTicketTeacherComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
  }


  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
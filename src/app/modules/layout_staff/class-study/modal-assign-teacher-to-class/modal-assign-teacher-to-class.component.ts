import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { RadioGroupComponent } from 'src/app/_shared/components/radio-group/radio-group.component';

@Component({
  selector: 'app-modal-assign-teacher-to-class',
  templateUrl: './modal-assign-teacher-to-class.component.html',
  styleUrls: ['./modal-assign-teacher-to-class.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    RadioGroupComponent
  ]
})
export class ModalAssignTeacherToClassComponent implements OnInit {
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

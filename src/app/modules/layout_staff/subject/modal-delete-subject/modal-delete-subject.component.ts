import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';

@Component({
  selector: 'app-modal-delete-subject',
  templateUrl: './modal-delete-subject.component.html',
  styleUrls: ['./modal-delete-subject.component.scss'],
  standalone: true,
      imports: [
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule
      ]
})
export class ModalDeleteSubjectComponent implements OnInit {
  @Input() dataModal: any;
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

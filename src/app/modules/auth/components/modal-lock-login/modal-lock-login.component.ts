import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { FormatTimeToMinutePipe } from 'src/app/_shared/pipe/format-time-to-minute.pipe';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';

@Component({
    selector: 'app-modal-lock-login',
    templateUrl: './modal-lock-login.component.html',
    styleUrls: ['./modal-lock-login.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      RouterLink, 
      FormatTimeToMinutePipe,
      ButtonComponent
    ]
})
export class ModalLockLoginComponent implements OnInit {
  @Input() dataModal: any;
  timeLeft: number;
  interval;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.timeLeft = this.dataModal.dataFromParent;
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.closeModal(true);
      }
    }, 1000)
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}

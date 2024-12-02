import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import {
  TIME_OUT_LISTEN_FIREBASE
} from './../../utils/constant';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.scss'],
    standalone: true,
    imports: [
        TranslocoModule,
        NgIf,
        LoadingComponent,
    ],
})
export class ModalDeleteComponent implements OnInit {
  isLoading = false;
  dataFromParent: any;
  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  submit() {
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );

    this.dataFromParent.apiSubmit(this.dataFromParent.dataInput).subscribe(
      (res: any) => {},
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
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

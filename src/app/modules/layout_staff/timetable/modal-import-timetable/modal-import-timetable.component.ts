import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { ParentService } from '../../services/parent.service';
import { GeneralService } from 'src/app/_services/general.service';
import { GlobalStore } from 'src/app/_store/global.store';

@Component({
  selector: 'app-modal-import-timetable',
  templateUrl: './modal-import-timetable.component.html',
  styleUrls: ['./modal-import-timetable.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule, 
    FormsModule, 
    NgIf, 
    InputComponent,
    ButtonComponent
  ]
})
export class ModalImportTimetableComponent implements OnInit {
  @Input() dataModal: any;
  fileName: string ='';
  file: any = null;
  nzNotFoundContent: string = 'employee.notFoundContent';
  // schoolId: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private router: Router,
    private parentService: ParentService,
    private generalService: GeneralService,
    private globalStore:GlobalStore
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.globalStore.isLoading = true;
    let formData:FormData = new FormData();
    formData.append('upload', this.file);
    // this.parentService.uploadFileImportParent(formData).subscribe(
    //   (res: any) => {
    //   this.globalStore.isLoading = false;
    //   this.activeModal.close({
    //     keyImport: res.data.keyImport,
    //   });
    //   this.router.navigate([`staff/parent/result-import-file`, res.data.keyImport], {queryParams: {nameFile: this.fileName}});
    // }, (_err: any) => {
    //   this.globalStore.isLoading = false;
    //   this.generalService.showToastMessageError400(_err);
    // })
  }

  onFileChange(event) {
    // const file = event.target.files[0];
    // if (event.target.files.length > 0) {
    //   if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
    //     this.fileName = event.target.files[0].name;
    //     this.file = file;
    //   } else {
    //     this.showMessageService.warning(translate('errorFileExcel'))
    //   }
    // }
  }

  uploadFile() {
    document.getElementById('input-file-upload-parent').click();
  }

}

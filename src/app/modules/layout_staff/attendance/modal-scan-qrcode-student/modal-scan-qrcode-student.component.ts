import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxScannerQrcodeModule, LOAD_WASM, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { AttendanceService } from '../../services/attendance.service';

LOAD_WASM('/assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-modal-scan-qrcode-student',
  templateUrl: './modal-scan-qrcode-student.component.html',
  styleUrls: ['./modal-scan-qrcode-student.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    NgIf,
    NgFor,
    InputComponent,
    ButtonComponent,
    NgxScannerQrcodeModule
  ],
  providers: [DatePipe]
})
export class ModalScanQrcodeStudentComponent implements OnInit {
  @Input() dataModal: any;
  fromParent?: any;
  @Output() dataModalEmit = new EventEmitter<any>();
  checkedStudents: any[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void {}

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  handleDataQr(data: ScannerQRCodeResult[]) {
    if (data.length === 0) return;
    if (!data[0].value) return;
    const linkRedirectStudent = data[0].value;
    if (!linkRedirectStudent.concat('redirect-student')) return;
    const studentID = linkRedirectStudent.split('/').pop();
    const student = this.fromParent.students.find(f => f.id === Number(studentID));
    if(!student) return;
    if (this.checkedStudents.findIndex(f => f.id === student.id) !== -1) return;
    this.checkedStudents.push(student);
    student.status = 1;
    this.attendanceService.callApiQrDataAttendance(this.fromParent?.classId, student).subscribe();
    

  }

  initData(): void{
    this.checkedStudents = this.fromParent.students.filter(s => s.status == 1)
  }
}

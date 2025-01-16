import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessagingService } from 'src/firebase/messaging-service';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { StatusStudent } from 'src/app/_shared/enums/status-student.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalScanQrcodeStudentComponent } from 'src/app/modules/layout_staff/attendance/modal-scan-qrcode-student/modal-scan-qrcode-student.component';

@Component({
  selector: 'app-attendance-save',
  templateUrl: './attendance-save.component.html',
  styleUrls: ['./attendance-save.component.scss'],
  standalone: true,
  imports: [
    InputSearchComponent,
    NgFor,
    SelectComponent,
    InputComponent,
    ButtonComponent,
    FormatTimePipe,
    ButtonBackComponent,
    RouterLink
  ]
})
export class AttendanceSaveComponent implements OnInit {
  dataList: any = [];
    pageIndex = PAGE_INDEX_DEFAULT;
    pageSize = PAGE_SIZE_DEFAULT;
    keyWord: string = ''
    date: number = 1;
    classIds: Array<number> = []
    classId: any;
    attendanceId: any;
    dataOptionsStatus: Select2[] = [
      {
        label: "Test",
        value: ""
      },
      {
        label: "Test2",
        value: ""
      }
    ]
    rollcallData: any = [];
    dateTimestampNow: number = new Date().getTime()/1000;
    attendanceEnum = StatusStudent
    constructor(
      private globalStore: GlobalStore,
      private attendanceSerivce: AttendanceService,
      private showMessageSerivce: ShowMessageService,
      private route: ActivatedRoute,
      private messagingSerivce: MessagingService,
      private modalService: NgbModal,
    ) { }
  
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
        this.attendanceId = params.get('attendanceId');
        if(this.attendanceId){
          this.getListStudentAttendance();
        }
      });
    }
  
    getListStudentAttendance(): void{
      this.globalStore.isLoading = true;
  
      let dataRequest = {
        class_id: this.classId,
        diemdanh_id: this.attendanceId
      }
  
      this.attendanceSerivce.getListStudentAttendance(dataRequest).subscribe((res: any) => {
        this.dataList = res;
        console.log(res);
        res.data?.data?.map((item) => {
          item.status = item.status == 0 ? 1 : item.status 
        })
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }
  
    onChangeRadio(item: any, value: any){
      item.statusValue = value;
    }
  
    onChangeNote(item: any, value: string){
      item.note = value;
    }
  
    onSubmit(){
      this.globalStore.isLoading = true;
  
      let rollCallData = [];
      this.dataList.data?.data?.map((item) => {
        rollCallData.push({
          studentID: item.id,
          status: item.statusValue ? item.statusValue : item.status,
          note: item.note,
        })
      })
      let dataRequest = {
        rollcallData: rollCallData,
        date: this.dateTimestampNow + 25200,
        teacher_subject_timetable_id: this.attendanceId
      }
      this.attendanceSerivce.attendanced(dataRequest, this.classId).subscribe((res) => {
        this.globalStore.isLoading = false;
  
        this.messagingSerivce.receiveMessaging();
        let message = this.messagingSerivce.currentMessage
  
        this.showMessageSerivce.success("Điểm danh thành công!");
      }, (err) => {
        this.globalStore.isLoading = false;
        this.showMessageSerivce.success("Điểm danh thành công!");
      })
    }

    startQrCode() {
      if(this.dataList){
        this.dataList?.data?.data.map((item) => {
          item.status = 2;
        })
      }
  
      const modalRef = this.modalService.open(ModalScanQrcodeStudentComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      });
  
      let data = {
        students: this.dataList?.data?.data ?? [],
        classId: this.classId
      }
  
      modalRef.componentInstance.fromParent = data;
      modalRef.componentInstance.initData();
    }
}

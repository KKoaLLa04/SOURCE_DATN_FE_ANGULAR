import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { Select2Component } from 'src/app/_shared/components/select-2/select-2.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { TIME_TABLE_STRUCT, timeTableOptionSubject } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ModalImportTimetableComponent } from '../modal-import-timetable/modal-import-timetable.component';

@Component({
  selector: 'app-modal-timetable',
  templateUrl: './modal-timetable.component.html',
  styleUrls: ['./modal-timetable.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    SelectComponent,
    ButtonComponent,
    ButtonBackComponent,
    RouterLink,
    Select2Component,
    TranslocoModule
  ]
})
export class ModalTimetableComponent implements OnInit {
  @Input() dataModal: any;
  dataFromParent: any;
    classId: any;
    optionSubjectArray = [];
    optionSubjectArrayAfternoon = [];
    optionSubject: Select2[] = timeTableOptionSubject;
    dataRequest: any = TIME_TABLE_STRUCT;
    dataOptionsChecked: any = [];
    updatedOptions: any[] = [];
    accessType: any = 1;
    dataListMorning: any = []
    dataListAfternoon: any = [];
    periods: any = [1,2,3,4,5];
    constructor(
      private route: ActivatedRoute,
      private globalStore: GlobalStore,
      private classStudyService: ClassStudyService,
      private showMessageService: ShowMessageService,
      public activeModal: NgbActiveModal,
      private modalService: NgbModal,
      private showMessageSerivce: ShowMessageService
    ) { }
  
    ngOnInit() {
      this.dataFromParent = this.dataModal.dataFromParent;
      console.log(this.dataFromParent)
      if(this.dataModal.dataFromParent.data.id){
        this.getListTimetable();
      }
    }
  
    onEditTimetable(value: any, item: any){
      const dayData = this.optionSubject.find(subject => subject?.data?.subject_id == value);
      let dataRequest;
      if(value){
        dataRequest = {
          classId: this.dataModal.dataFromParent?.data?.id,
          userId: dayData?.data?.user_id,
          timetableId: item.id,
          subjectId: dayData?.data?.subject_id,
          classSubjectTeacherId: dayData?.data?.class_subject_teacher_id,
          categoryTimetableId: this.dataModal.dataFromParent?.dataTimetable?.id
        }
      }else{
        dataRequest = {
          classId: this.dataModal.dataFromParent?.data?.id,
          userId: 0,
          timetableId: item.id,
          subjectId: 0,
          classSubjectTeacherId: 0,
          categoryTimetableId: this.dataModal.dataFromParent?.dataTimetable?.id
        }
      }
  
      this.globalStore.isLoading = true;
      this.classStudyService.updateTimetable(dataRequest).subscribe((res) => {
        this.globalStore.isLoading = false;
        item.validateConfig = ''
        this.showMessageService.success("Cập nhật thời khóa biểu thành công!");
      }, (err) => {
        item.validateConfig = err.msg
        this.globalStore.isLoading = false;
      })
    }

    closeModal(sendData: any) {
      this.activeModal.close(sendData);
    }
  
    private getListTimetable(){
      this.globalStore.isLoading = true;
      let dataRequest = {
        classId: this.dataModal.dataFromParent.data.id,
        categoryTimetableId: this.dataModal.dataFromParent.dataTimetable.id
      }
  
      this.classStudyService.getTimetableData(dataRequest).subscribe((res: any) => {
        // this.dataList = res;
        this.optionSubject = [
          {
            label: "chọn môn học",
            value: "",
            selected: true
          }
        ];
        res?.data?.subject_teachers?.map((item) => {
          if(item.subject_id !=0){
            this.optionSubject.push({
              label: item.subject_name + ' - ' + item.user_name,
              value: item.subject_id,
              data: item,
            })
          }
        })
        this.dataListMorning = res?.data?.timetables[0]
        this.dataListAfternoon = res?.data?.timetables[1]
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.globalStore.isLoading = false;
        // this.showMessageSerivce.error(err);
      })
    }
  
    getPeriodData(day: number, period: number) {
      const dayData = this.dataListMorning.days.find(d => d.day == day);
      return dayData?.period.find(p => p.period == period);
    }
  
    getPeriodDataAfternoon(day: number, period: number) {
      const dayData = this.dataListAfternoon.days.find(d => d.day == day);
      return dayData?.period.find(p => p.period == period);
    }

    viewImportTimetable(time: number) {
      const modalRef = this.modalService.open(ModalImportTimetableComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      });
  
      let data = {
        titleModal: 'Thời khóa biểu lớp ... tuần ...',
        btnCancel: 'Hủy',
        btnAccept: 'Lưu',
        isHiddenBtnClose: false, // hidden/show btn close modal
        dataFromParent: {
          data: this.dataModal.dataFromParent?.data?.id,
          // dataTimetable: dataTimetable,
          // service: this.timetableService,
          // apiSubmit: (dataInput: any) => this.timetableService.createNewTimes(dataInput),
          nameForm: 'create',
        },
      };
  
      modalRef.componentInstance.dataModal = data;
      console.log(modalRef.componentInstance);
      // Nhận dữ liệu từ modal khi người dùng xác nhận
      modalRef.componentInstance.dataModalEmit.subscribe((confirmedData) => {
        let dataSubmit = {
          category_attendance: this.dataModal.dataFromParent?.dataTimetable?.id,
          class_id: this.dataModal.dataFromParent?.data?.id,
          time: time,
          periods: confirmedData
        }
        this.importDataTimetable(dataSubmit)
      });
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            this.getListTimetable();
          }
        },
        (reason) => { 
          this.showMessageSerivce.error(reason);
        }
      );
    }

    importDataTimetable(dataRequest: any){
      this.globalStore.isLoading = true;
  
      this.classStudyService.importExcelData(dataRequest).subscribe((res: any) => {
        this.globalStore.isLoading = false;
        this.showMessageSerivce.success("Import dữ liệu file excel thành công");
      }, (err) =>{
        this.globalStore.isLoading = false;
        // this.showMessageSerivce.error(err);
      })
    }
}

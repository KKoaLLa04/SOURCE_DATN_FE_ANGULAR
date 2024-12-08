import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';
import { ActivatedRoute } from '@angular/router';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';

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
    ButtonComponent
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
  constructor(
    private globalStore: GlobalStore,
    private attendanceSerivce: AttendanceService,
    private showMessageSerivce: ShowMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('classId'); // Lấy giá trị của tham số 'id'
      this.getListStudentAttendance();
    });
  }

  getListStudentAttendance(): void{
    this.globalStore.isLoading = true;

    let dataRequest = {
      class_id: this.classId
    }

    this.attendanceSerivce.getListStudentAttendance(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res)
      res.data?.data?.map((item) => {
        item.status = 1
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
        status: item.status,
        note: item.note
      })
    })
    let dataRequest = {
      rollCallData: rollCallData,
      date: this.dateTimestampNow
    }
    this.attendanceSerivce.attendanced(dataRequest, this.classId).subscribe((res) => {
      this.globalStore.isLoading = false;
      this.showMessageSerivce.success("Điểm danh thành công!");
    }, (err) => {
      this.globalStore.isLoading = false;
      this.showMessageSerivce.error("Có lỗi xảy ra");
    })
  }
}

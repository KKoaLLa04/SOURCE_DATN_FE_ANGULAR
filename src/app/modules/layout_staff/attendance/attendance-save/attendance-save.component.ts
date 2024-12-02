import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { AttendanceService } from '../../services/attendance.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { InputComponent } from 'src/app/_shared/components/input/input.component';

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
  ]
})
export class AttendanceSaveComponent implements OnInit {
  dataList: any = [];
  dataOptionsStatus: Select2[] = [
    {
      label: "Test",
      value: ""
    },
    {
      label: "Test",
      value: ""
    }
  ]
  constructor(
    private globalStore: GlobalStore,
    private attendanceSerivce: AttendanceService,
    private showMessageSerivce: ShowMessageService
  ) { }

  ngOnInit() {
    this.getListStatisticData();
  }

  getListStatisticData(): void{
    this.globalStore.isLoading = true;

    this.attendanceSerivce.getListAttendance().subscribe((res: any) => {
      this.dataList = res;
      console.log(res)
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }
}

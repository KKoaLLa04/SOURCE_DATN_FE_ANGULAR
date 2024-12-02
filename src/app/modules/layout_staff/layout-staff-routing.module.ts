import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { StatisticAttendanceComponent } from "./statistic-attendance/statistic-attendance.component";
import { StatisticDetailAttendanceComponent } from "./statistic-attendance/statistic-detail-attendance/statistic-detail-attendance.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { AttendanceSaveComponent } from "./attendance/attendance-save/attendance-save.component";

const routes: Routes = [
  {
    path: 'list_attendance_statistic',
    children: [
      {
        path: '',
        component: StatisticAttendanceComponent,
      },
      {
        path: "detail/:id",
        component: StatisticDetailAttendanceComponent
      }
    ]
  },
  {
    path: 'list_attendance',
    children: [
      {
        path: '',
        component: AttendanceComponent,
      },
      {
        path: "save/:classId",
        component: AttendanceSaveComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutStaffRoutingModule {}

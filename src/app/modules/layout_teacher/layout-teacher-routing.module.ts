import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from "./attendance/attendance.component";
import { AttendanceSaveComponent } from "./attendance/attendance-save/attendance-save.component";
import { StudentLayoutTeacherComponent } from "./student-layout-teacher/student-layout-teacher.component";

const routes: Routes = [
  {
    path: 'attendance',
    children: [
      {
        path: '',
        component: AttendanceComponent
      },
      {
        path: "save/:classId",
        component: AttendanceSaveComponent
      }
    ]
  },
  {
    path: 'student',
    children: [
      {
        path: '',
        component: StudentLayoutTeacherComponent
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

export class LayoutTeacherRoutingModule {}

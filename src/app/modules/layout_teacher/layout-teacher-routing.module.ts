import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from "./attendance/attendance.component";
import { AttendanceSaveComponent } from "./attendance/attendance-save/attendance-save.component";
import { StudentLayoutTeacherComponent } from "./student-layout-teacher/student-layout-teacher.component";
import { ProfileComponent } from "./profile/profile.component";
import { TimetableTeacherComponent } from "./timetable-teacher/timetable-teacher.component";
import { StudentDetailTeacherComponent } from "./student-layout-teacher/student-detail-teacher/student-detail-teacher.component";

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
        path: "detail/:id",
        component: StudentDetailTeacherComponent
      }
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'timetable',
    children: [
      {
        path: '',
        component: TimetableTeacherComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutTeacherRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from "./attendance/attendance.component";
import { AttendanceSaveComponent } from "./attendance/attendance-save/attendance-save.component";
import { StudentLayoutTeacherComponent } from "./student-layout-teacher/student-layout-teacher.component";
import { ProfileComponent } from "./profile/profile.component";
import { TimetableTeacherComponent } from "./timetable-teacher/timetable-teacher.component";
import { StudentDetailTeacherComponent } from "./student-layout-teacher/student-detail-teacher/student-detail-teacher.component";
import { ClassStudyTeacherComponent } from "./class-study-teacher/class-study-teacher.component";
import { AttendanceDetailComponent } from "./attendance/attendance-detail/attendance-detail.component";

const routes: Routes = [
  {
    path: 'attendance',
    children: [
      {
        path: '',
        component: AttendanceComponent
      },
      {
        path: 'detail/:classId/:statusTeacher',
        component: AttendanceDetailComponent
      },
      {
        path: "save/:classId/:attendanceId",
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
  {
    path: 'class',
    children: [
      {
        path: '',
        component: ClassStudyTeacherComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutTeacherRoutingModule {}

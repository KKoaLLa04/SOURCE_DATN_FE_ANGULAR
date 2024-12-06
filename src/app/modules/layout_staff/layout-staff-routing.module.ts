import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { StatisticAttendanceComponent } from "./statistic-attendance/statistic-attendance.component";
import { StatisticDetailAttendanceComponent } from "./statistic-attendance/statistic-detail-attendance/statistic-detail-attendance.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { AttendanceSaveComponent } from "./attendance/attendance-save/attendance-save.component";
import { SubjectComponent } from "./subject/subject.component";
import { SubjectAssignComponent } from "./subject/subject-assign/subject-assign.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { AcademicComponent } from "./academic/academic.component";
import { ClassStudyComponent } from "./class-study/class-study.component";
import { ClassStudyAssignStudentComponent } from "./class-study/class-study-assign-student/class-study-assign-student.component";
import { StudentComponent } from "./student/student.component";

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
  {
    path: 'subject',
    children: [
      {
        path: '',
        component: SubjectComponent
      },
      {
        path: 'assign',
        component: SubjectAssignComponent
      }
    ]
  },
  {
    path: 'teacher',
    children: [
      {
        path: '',
        component: TeacherComponent
      }
    ]
  },
  {
    path: 'academic',
    children: [
      {
        path: '',
        component: AcademicComponent
      }
    ]
  },
  {
    path: 'class-study',
    children: [
      {
        path: '',
        component: ClassStudyComponent
      },
      {
        path: 'assign-student',
        component: ClassStudyAssignStudentComponent
      }
    ]
  },
  {
    path: 'student',
    children: [
      {
        path: '',
        component: StudentComponent
      },
      {
        path: 'assign-student',
        component: ClassStudyAssignStudentComponent
      }
    ]
  },
  {
    path: 'parent',
    children: [
      {
        path: '',
        component: StudentComponent
      },
      {
        path: 'assign-student',
        component: ClassStudyAssignStudentComponent
      }
    ]
  },
  {
    path: 'school-year',
    children: [
      {
        path: '',
        component: StudentComponent
      },
      {
        path: 'assign-student',
        component: ClassStudyAssignStudentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutStaffRoutingModule {}

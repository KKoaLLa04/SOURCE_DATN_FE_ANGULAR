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
import { StudentDetailComponent } from "./student/student-detail/student-detail.component";
import { ClassStudyDetailComponent } from "./class-study/class-study-detail/class-study-detail.component";
import { NoteMarkComponent } from "./note-mark/note-mark.component";
import { NoteMarkDetailComponent } from "./note-mark/note-mark-detail/note-mark-detail.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TimeTableStaffComponent } from "./class-study/time-table-staff/time-table-staff.component";
import { ExamComponent } from "./exam/exam.component";
import { SchoolYearComponent } from "./school-year/school-year.component";
import { ParentStaffComponent } from "./parent-staff/parent-staff.component";

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
        path: 'assign-student/:classId',
        component: ClassStudyAssignStudentComponent
      },
      {
        path: 'detail/:classId',
        component: ClassStudyDetailComponent
      },
      {
        path: 'timetable/:classId',
        component: TimeTableStaffComponent
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
      },
      {
        path: "detail/:id",
        component: StudentDetailComponent
      }
    ]
  },
  {
    path: 'parent',
    children: [
      {
        path: '',
        component: ParentStaffComponent
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
        component: SchoolYearComponent
      },
      {
        path: 'assign-student',
        component: ClassStudyAssignStudentComponent
      }
    ]
  },
  {
    path: 'note-mark',
    children: [
      {
        path: '',
        component: NoteMarkComponent
      },
      {
        path: 'detail/:id',
        component: NoteMarkDetailComponent
      }
    ]
  },
  {
    path: 'ticket',
    children: [
      {
        path: '',
        component: TicketComponent
      },
      {
        path: 'detail/:id',
        component: NoteMarkDetailComponent
      }
    ]
  },
  {
    path: 'exam',
    children: [
      {
        path: '',
        component: ExamComponent
      },
      {
        path: 'detail/:id',
        component: NoteMarkDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutStaffRoutingModule {}

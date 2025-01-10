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
import { ParentDetailStaffComponent } from "./parent-staff/parent-detail-staff/parent-detail-staff.component";
import { ConfigTimetableComponent } from "./config-timetable/config-timetable.component";
import { ProfileComponent } from "./profile/profile.component";
import { AttendanceDetailComponent } from "./attendance/attendance-detail/attendance-detail.component";
import { TimetableComponent } from "./timetable/timetable.component";
import { HistoryAttendanceComponent } from "./history-attendance/history-attendance.component";
import { HistoryDetailAttendanceComponent } from "./history-attendance/history-detail-attendance/history-detail-attendance.component";
import { HistoryDataAttendanceComponent } from "./history-attendance/history-data-attendance/history-data-attendance.component";

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
        path: "detail/:classId",
        component: AttendanceDetailComponent
      },
      {
        path: "save/:classId/:attendanceId",
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
        path: ':id',
        component: ParentDetailStaffComponent 
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
  },
  {
    path: 'config',
    children: [
      {
        path: '',
        component: ConfigTimetableComponent
      },
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
        component: TimetableComponent
      },
    ]
  },
  {
    path: 'history_attendance',
    children: [
      {
        path: '',
        component: HistoryAttendanceComponent
      },
      {
        path: ':classId',
        component: HistoryDetailAttendanceComponent
      },
      {
        path: 'history/:classId',
        component: HistoryDataAttendanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutStaffRoutingModule {}

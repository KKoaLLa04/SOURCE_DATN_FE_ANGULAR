import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TicketParentComponent } from "./ticket-parent/ticket-parent.component";
import { TimeTableStaffComponent } from "../layout_staff/class-study/time-table-staff/time-table-staff.component";
import { HistoryAttendanceComponent } from "./history-attendance/history-attendance.component";
import { NoteMarkDetailParentComponent } from "./note-mark-detail-parent/note-mark-detail-parent.component";
import { ProfileComponent } from "./profile/profile.component";
import { TimetableParentComponent } from "./timetable-parent/timetable-parent.component";

const routes: Routes = [
  {
    path: 'list_attendance_statistic',
    children: [
      {
        path: '',
        component: HistoryAttendanceComponent
      }
    ]
  },
  {
    path: 'ticket',
    children: [
      {
        path: '',
        component: TicketParentComponent
      }
    ]
  },
  {
    path: 'timetable',
    children: [
      {
        path: '',
        component: TimetableParentComponent
      }
    ]
  },
  {
    path: 'note-mark',
    children: [
      {
        path: '',
        component: NoteMarkDetailParentComponent
      }
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutParentRoutingModule {}

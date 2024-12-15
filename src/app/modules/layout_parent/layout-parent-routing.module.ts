import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TicketParentComponent } from "./ticket-parent/ticket-parent.component";

const routes: Routes = [
  {
    path: 'list_attendance_statistic',
    children: [

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutParentRoutingModule {}

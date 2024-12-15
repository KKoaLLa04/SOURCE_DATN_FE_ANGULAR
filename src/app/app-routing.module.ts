import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreOmtLayoutComponent } from './_layouts/core-omt-layout/core-layout.component';
import { AuthGuard } from './_core/_helpers/guard/auth.guard';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './_shared/components/server-error/server-error.component';
import { AccessDeniedComponent } from './_shared/components/access-denied/access-denied.component';

export const routes: Routes = [

  {
    path: '',
    component: CoreOmtLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./modules/layout_staff/layout-staff-manager.module').then(
            (m) => m.LayoutStaffManager
          ),
      },
      {
        path: 'parent',
        loadChildren: () =>
          import('./modules/layout_parent/layout-parent-manager.module').then(
            (m) => m.LayoutParentManager
          ),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('./modules/layout_teacher/layout-teacher-manager.module').then(
            (m) => m.LayoutTeacherManager
          ),
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'accessdenied', component: AccessDeniedComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeIndexComponent } from './components/home-index/home-index.component';
import { HomeTeacherComponent } from "./components/home-teacher/home-teacher.component";

const routes: Routes = [
  { 
    path: '',
    component: HomeIndexComponent,
  },
  { 
    path: 'index',
    component: HomeTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {}

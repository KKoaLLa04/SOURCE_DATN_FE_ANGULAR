import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeIndexComponent } from './components/home-index/home-index.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {}

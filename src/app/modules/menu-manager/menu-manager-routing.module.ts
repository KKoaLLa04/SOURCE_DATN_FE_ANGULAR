import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MenuGeneralManagerComponent } from "./components/menu-general-manager/menu-general-manager.component";
import { DetailMenuPackageManagerComponent } from "./components/tab-package-menu/detail-menu-package-manager/detail-menu-package-manager.component";

const routes: Routes = [
  {
    path: '',
    component: MenuGeneralManagerComponent,
  },
  {
    path: 'detail-menu-package/:id',
    component: DetailMenuPackageManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MenuManagerRoutingModule {}

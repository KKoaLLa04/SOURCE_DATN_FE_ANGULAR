import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NgChartsModule } from 'ng2-charts';
import { CoreModule } from 'src/app/_core/core.module';
import { ChooseIconComponent } from 'src/app/_shared/components/choose-icon/choose-icon.component';
import { MenuGeneralManagerComponent } from './components/menu-general-manager/menu-general-manager.component';
import { ListMenuManagerComponent } from './components/tab-menu/list-menu-manager/list-menu-manager.component';
import { ShowDetailSubRouteComponent } from './components/tab-menu/show-detail-sub-route/show-detail-sub-route.component';
import { DetailMenuPackageManagerComponent } from './components/tab-package-menu/detail-menu-package-manager/detail-menu-package-manager.component';
import { ListPackageMenuManagerComponent } from './components/tab-package-menu/list-package-menu-manager/list-package-menu-manager.component';
import { MenuManagerRoutingModule } from './menu-manager-routing.module';
import { ModalAddMenuComponent } from './modals/modal-add-menu/modal-add-menu.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UpdatePackageMenuManagerComponent } from './components/tab-package-menu/update-package-menu-manager/update-package-menu-manager.component';
import { CeratePackageMenuManagerComponent } from './components/tab-package-menu/cerate-package-menu-manager/cerate-package-menu-manager.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
    imports: [
        CommonModule,
        MenuManagerRoutingModule,
        CoreModule,
        NzIconModule,
        NgChartsModule,
        NzCheckboxModule,
        NzPopoverModule,
        NzTreeModule,
        TranslocoModule,
        NgxPermissionsModule.forChild(),
        DragDropModule,
        NzSelectModule,
        NzDropDownModule,
        MenuGeneralManagerComponent,
        ListMenuManagerComponent,
        ShowDetailSubRouteComponent,
        ModalAddMenuComponent,
        ListPackageMenuManagerComponent,
        ChooseIconComponent,
        DetailMenuPackageManagerComponent,
        CeratePackageMenuManagerComponent,
        UpdatePackageMenuManagerComponent
    ],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: "menu-manager" }]
})

export class MenuManagerModule {}

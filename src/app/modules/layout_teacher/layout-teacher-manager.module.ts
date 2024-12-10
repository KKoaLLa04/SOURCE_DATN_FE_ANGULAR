import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgChartsModule } from 'ng2-charts';
import { CoreModule } from 'src/app/_core/core.module';
import { LayoutTeacherRoutingModule } from './layout-teacher-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        NzIconModule,
        NgChartsModule,
        NzCheckboxModule,
        LayoutTeacherRoutingModule
  ],
})

export class LayoutTeacherManager {}

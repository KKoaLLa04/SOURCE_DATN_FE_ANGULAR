import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPermissionsModule } from "ngx-permissions";
import { LoadingComponent } from '../_shared/components/loading/loading.component';
import { PaginationComponent } from '../_shared/components/pagination/pagination.component';
import { SingleDatePickerComponent } from '../_shared/components/single-date-picker/single-date-picker.component';
import { OnlyNumberDirective } from '../_shared/directive/only-number-interger.directive';
import { ModalChangePasswordGlobalComponent } from '../_shared/modals/modal-change-password/modal-change-password.component';
import { FormatTimePipe } from '../_shared/pipe/format-time.pipe';
import { SubstringPipe } from '../_shared/pipe/substring.pipe';
import { FieldErrorDisplayComponent } from '../_shared/components/field-error-display/field-error-display.component';
import { StudentAvatarPipe } from '../_shared/pipe/student-avatar.pipe';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbPaginationModule,
        OverlayModule,
        NzNotificationModule,
        NgxDaterangepickerMd,
        TranslocoModule,
        NgxPermissionsModule.forChild(),
        LoadingComponent,
        PaginationComponent,
        FormatTimePipe,
        SubstringPipe,
        StudentAvatarPipe,
        SingleDatePickerComponent,
        OnlyNumberDirective,
        ModalChangePasswordGlobalComponent,
        FieldErrorDisplayComponent
    ],
    exports: [
        LoadingComponent,
        PaginationComponent,
        FormatTimePipe,
        SubstringPipe,
        StudentAvatarPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbPaginationModule,
        OverlayModule,
        NzNotificationModule,
        SingleDatePickerComponent,
        NgxPermissionsModule,
        OnlyNumberDirective,
        FieldErrorDisplayComponent
    ],
    providers: [
        { provide: TRANSLOCO_SCOPE, useValue: '' }
    ]
})
export class CoreModule {}

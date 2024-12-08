import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ModalLockLoginComponent } from './components/modal-lock-login/modal-lock-login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CoreModule } from 'src/app/_core/core.module';
import { NumberDirective } from 'src/app/_shared/directive/only-number.directive';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormatTimeToMinutePipe } from 'src/app/_shared/pipe/format-time-to-minute.pipe';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NzSwitchModule,
        NzRadioModule,
        CoreModule,
        TranslocoModule,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        LogoutComponent,
        AuthComponent,
        ModalLockLoginComponent,
        ResetPasswordComponent,
        NumberDirective,
        FormatTimeToMinutePipe
    ],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: "auth" }],
})
export class AuthModule {}

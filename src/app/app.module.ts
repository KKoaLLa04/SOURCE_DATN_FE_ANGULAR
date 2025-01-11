import { DefaultLayoutModule } from './_layouts/default-layout/default-layout.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// end import firebase
// transloco
import { TranslocoConfig, TranslocoModule, TRANSLOCO_CONFIG } from "@ngneat/transloco";
import { httpLoader } from "./http-loader";
// #fake-start#
import { AsyncPipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CoreModule } from './_core/core.module';
import { TokenInterceptor } from './_core/_helpers/token.interceptor';
import { ModalDeleteComponent } from './_shared/modals/modal-delete/modal-delete.component';
import { ErrorInterceptor } from './_core/_helpers/error.interceptor';
import { NgxPermissionsModule } from "ngx-permissions";
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './_core/_helpers/guard/auth.guard';
import { ServerErrorComponent } from './_shared/components/server-error/server-error.component';
import { CoreLayoutModule } from './_layouts/core-omt-layout/core-layout.module';
import { environment } from 'src/environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { initializeApp } from '@angular/fire/app';
import { MessagingService } from 'src/firebase/messaging-service';
import { DemoComponent } from './demo/demo.component';
registerLocaleData(en);
// #fake-end#

@NgModule({
    declarations: [	
      DemoComponent
   ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ClipboardModule,
        AppRoutingModule,
        NgxPermissionsModule.forRoot(),
        NgbModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        DefaultLayoutModule,
        NgxDaterangepickerMd.forRoot(),
        CoreLayoutModule,
        NgChartsModule,
        CKEditorModule,
        CoreModule,
        TranslocoModule,
        // ModalDeleteComponent,
        PageNotFoundComponent,
        PageNotFoundComponent,
        ServerErrorComponent,
        AngularFireModule.initializeApp(environment.firebaseConfig), // Khởi tạo Firebase với cấu hình
        AngularFireAuthModule, // Nếu bạn sử dụng Firebase Auth
        AngularFirestoreModule, // Nếu bạn sử dụng Firestore
        AngularFireMessagingModule, // Nếu bạn sử dụng Firebase Messaging
        // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    ],
    providers: [
        AuthGuard,
        httpLoader,
        {
            provide: TRANSLOCO_CONFIG,
            useValue: {
                availableLangs: ["en", "vi"],
                reRenderOnLangChange: true,
                fallbackLang: "en",
                defaultLang: localStorage.getItem("language") || "vi",
            } as TranslocoConfig,
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        MessagingService,
        AsyncPipe
    ],
    bootstrap: [],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { ErrorInterceptor } from './_core/_helpers/error.interceptor';
import { AuthGuard } from './_core/_helpers/guard/auth.guard';
import { TokenInterceptor } from './_core/_helpers/token.interceptor';
import { httpLoader } from './http-loader';
import { environment } from "../environments/environment.firebase";
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { GlobalStore } from './_store/global.store';

const customLanguagePack = {
  vi_VN,
  ...{
    Empty: {
      description: "Không có dữ liệu"
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot(),
      NgxPermissionsModule.forRoot(),
      NgxDaterangepickerMd.forRoot(),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      TranslocoModule
    ]),
    AuthGuard,
    GlobalStore,
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
    { provide: NZ_I18N, useValue: localStorage.getItem("language") && localStorage.getItem("language") === 'en' ? en_US : customLanguagePack }
  ]
};

import { HttpClient } from '@angular/common/http';
import { Translation, TRANSLOCO_LOADER, TranslocoLoader } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(langPath: string) {
    this.http.get<Translation>(`/assets/i18n/en.json`);
    return this.http.get<Translation>(`/assets/i18n/vi.json`);
  }
}

export const httpLoader = { provide: TRANSLOCO_LOADER, useClass: HttpLoader };

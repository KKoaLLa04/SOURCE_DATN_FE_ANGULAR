import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import * as vi from 'src/assets/i18n/vi.json';
import * as en from 'src/assets/i18n/en.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { vi, en },
    translocoConfig: {
      availableLangs: ['vi', 'en'],
      defaultLang: 'vi',
    },
    preloadLangs: true,
    ...options
  });
}

import { Pipe, PipeTransform } from '@angular/core';
import { moduleCategoryTypeEnum } from '../enums/module-category.enum';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'moduleCategory',
  standalone: true
})
export class ModuleCategoryPipe implements PipeTransform {
  
  constructor( private translocoService: TranslocoService){

  }

  transform(value: any, args?: any): string {
    let result:string = "";
    switch (value) {
      case moduleCategoryTypeEnum.GENERAL_INFORMATION:
        result = this.translocoService.translate(moduleCategoryTypeEnum.GENERAL_INFORMATION_NAME);
        break
      case moduleCategoryTypeEnum.SERVICE:
        result = this.translocoService.translate(moduleCategoryTypeEnum.SERVICE_NAME);
        break
      case moduleCategoryTypeEnum.STUDY_INFORMATION:
        result = this.translocoService.translate(moduleCategoryTypeEnum.STUDY_INFORMATION_NAME);
        break
    }
    return result;
  }

}

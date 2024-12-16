import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { statusSchoolYearEnum } from '../enums/status-school-year.enum';

@Directive({
  selector: '[appStatusSchoolYear]',
  standalone: true
})
export class StatusSchoolYearDirective {
 @Input() set statusValue(status: string | number) {
        this.setColor(status);
      }
  
      @Input() set sizeText(size:string){
        this.setSizeText(size);
      }
  
      constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private translateService: TranslateService
      ) {
  
      }
  
      private setColor(status: string | number): void {
        let textColor: string;
        let text: string;
        let bgColor: string;
        switch (Number(status)) {
          case Number(statusSchoolYearEnum.NOT_STARTED_YET):
            text = "Chưa diễn ra";
            break;
          case Number(statusSchoolYearEnum.ONGOING):
            text = "Đang diễn ra";
            break;
          case Number(statusSchoolYearEnum.FINISHED):
            text = "Đã kết thúc";
            break;
        }
  
        this.renderer.setStyle(this.el.nativeElement, 'font-size', "12px");
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', 500);
        this.renderer.setProperty(this.el.nativeElement, 'textContent', this.translateService.instant(text));
  
        this.translateService.onLangChange.subscribe((ref: any) => {
          this.renderer.setProperty(this.el.nativeElement, 'textContent', this.translateService.instant(text));
        });
      }
  
      private setSizeText(size:string){
        this.renderer.addClass(this.el.nativeElement, size);
      }
}

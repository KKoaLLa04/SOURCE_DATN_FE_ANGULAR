import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatusDayOfWeekend } from '../enums/status-day-of-weekend.enum';

@Directive({
  selector: '[appStatusDayOfWeek]',
  standalone: true
})
export class StatusDayOfWeekDirective {
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
          case Number(StatusDayOfWeekend.SUNDAY):
            text = "Chủ nhật";
            break;
          case Number(StatusDayOfWeekend.MONDAY):
            text = "Thứ 2";
            break;
          case Number(StatusDayOfWeekend.TUESDAY):
            text = "Thứ 3";
            break;
          case Number(StatusDayOfWeekend.WEDNESDAY):
            text = "Thứ 4";
            break;
          case Number(StatusDayOfWeekend.THURSDAY):
            text = "Thứ 5";
            break;
          case Number(StatusDayOfWeekend.FRIDAY):
            text = "Thứ 6";
            break;
          case Number(StatusDayOfWeekend.SATURDAY):
            text = "Thứ 7";
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

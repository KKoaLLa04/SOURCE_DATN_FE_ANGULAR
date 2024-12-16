import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STATUS } from '../enums/status.enum';

@Directive({
  selector: '[appStatusActive]',
  standalone: true
})
export class StatusActiveDirective {

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
          case Number(STATUS.ACTIVE):
            textColor = 'var(--bs-white)';
            bgColor = 'var(--bs-greenish-teal)';
            text = "Hoạt động";
            break;
          case Number(STATUS.NO_ACTIVE):
            textColor = 'var(--bs-white)';
            bgColor = 'var(--bs-red)';
            text = "Đã khóa";
            break;
        }
    
        this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
        this.renderer.setStyle(this.el.nativeElement, 'width', '150px');
        this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
        this.renderer.setStyle(this.el.nativeElement, 'font-size', "12px");
        this.renderer.setStyle(this.el.nativeElement, 'border-radius', "5px");
        this.renderer.setStyle(this.el.nativeElement, 'padding', "5px 12px 5px 12px");
        this.renderer.setStyle(this.el.nativeElement, 'background-color', bgColor);
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

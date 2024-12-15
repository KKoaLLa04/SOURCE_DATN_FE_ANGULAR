import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccessType } from '../enums/access-type.enum';

@Directive({
  selector: '[appAccessType]',
  standalone: true,
})
export class AccessTypeDirective {
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
        case Number(AccessType.MANAGER):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-azure)';
          text = "Quản lý trường";
          break;
        case Number(AccessType.TEACHER):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-bittersweet)';
          text = "Giáo viên";
          break;
        case Number(AccessType.GUARDIAN):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-green)';
          text = "phụ huynh";
          break;
        default:
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-white-smoke)';
          text = "không chức vụ";
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

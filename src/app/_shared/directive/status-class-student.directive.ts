import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { statusClassStudentEnum } from '../enums/status-class-student.enum';

@Directive({
  selector: '[appStatusClassStudent]',
  standalone: true
})
export class StatusClassStudentDirective {
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
        case Number(statusClassStudentEnum.LEAVE):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-black)';
          text = "Nghỉ học";
          break;
        case Number(statusClassStudentEnum.NOT_YET_CLASS):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-red)';
          text = "Chưa vào lớp";
          break;
        case Number(statusClassStudentEnum.STUDYING):
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-green)';
          text = "Đang học";
          break;
        default:
          textColor = 'var(--bs-white)';
          bgColor = 'var(--bs-green)';
          text = "Đang học";
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { Radio } from 'src/app/_models/gengeral/radio.model';

type ValueBackgroundColor = "whilte" | "white-smoke";

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  standalone: true,
  imports: [NgIf,NgFor,FormsModule, ReactiveFormsModule, TranslocoModule, FieldErrorDisplayComponent,NzRadioComponent,NzRadioGroupComponent]
})
export class RadioGroupComponent implements OnInit {
  codeRandom:string = "";

  @Input() options: Radio[] = [];
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() sizeRadio: string = "form-check-sm";
  @Input() validateForm:any[] = [];
  @Input() disabled: boolean = false;
  @Input() isVertical:boolean = false;
  @Input() showBorder:boolean = true;
  @Input() bgColor:ValueBackgroundColor = "white-smoke";
  @Output() changeRadio = new EventEmitter<any>();

  constructor(
  ) {
    // todo
  }

  ngOnInit() {
    this.codeRandom = this.generateRandomCode(10);
  }

  generateRandomCode(length: number = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
  }

  onChange(event: any) {
    let value: any = event.target.value;
    this.changeRadio.emit(value);
  }

  generalIdRadio(value:any){
    return `${value}${this.codeRandom}`;
  }
}

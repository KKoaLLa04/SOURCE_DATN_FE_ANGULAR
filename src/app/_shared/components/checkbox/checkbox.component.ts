import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    // viewProviders: [
    //     { provide: ControlContainer, useExisting: FormGroupDirective },
    // ],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        NzCheckboxComponent,
        NgFor,
        FieldErrorDisplayComponent,
    ],
})
export class CheckboxComponent implements OnInit {
  idNumberRandom: number = this.getRandomInt(9999);
  @Input() text: string = "";
  @Input() color: string = "text-color-river-bed";
  @Input() value: number | string;
  @Input() checked: boolean = false;
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm: any[] = [];
  @Input() disabled: boolean = false;
  @Input() center: boolean = false;
  @Input() borderColor: string = "border-color-azure";
  @Input() dataCheckbox: any = {};
  @Input() fontWeight:string = "fw-500";
  @Input() fontSize:string = "fs-13";
  @Input() bgColor:string = "";
  @Output() valueChange = new EventEmitter<any>();
  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  onInputChange(event: any) {
    event ? this.valueChange.emit({ checked: 1, dataCheckbox: this.dataCheckbox }) : this.valueChange.emit({ checked: 0, dataCheckbox: this.dataCheckbox });
  }
}

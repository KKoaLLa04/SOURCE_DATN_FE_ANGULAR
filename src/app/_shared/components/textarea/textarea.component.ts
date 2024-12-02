import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  imports: [
    NgIf,
    NgFor,
    FormsModule, 
    ReactiveFormsModule,
    FieldErrorDisplayComponent,
    NgStyle
  ]
})
export class TextareaComponent implements OnInit {
  @Input() value: string = "";
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() placeholder: string = "placeholder";
  @Input() validateForm: any[] = [];
  @Input() autosize: boolean = true;
  @Input() disabled: boolean = false;
  @Output() textareaChange = new EventEmitter<string>();
  @Input() bgColor:string = "";
  @Input() color:string = "";
  @Input() showBorder:boolean = true;
  @Input() fontWeight:number = 500;
  @Input() maxLength:number = 160;
  @Input() fontSize:string = "fs-13";
  @Input() minHeight:string = "min-h-100px";
  constructor() {
    // todo
  }

  ngOnInit() {
    this.value = typeof this.value === "undefined" ? "" : this.value;
  }

  onChange(event: any) {
    let value = event.target.value;
    this.textareaChange.emit(value);
  }

}

import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    FieldErrorDisplayComponent,
    TranslateModule
  ]
})
export class InputPasswordComponent implements OnInit {
  checkShow: boolean = false;
  @Input() value: string = "";
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() placeholder: string = "placeholder";
  @Input() disabled: boolean = false;
  @Input() validateForm: any[] = [];
  @Output() valueChange = new EventEmitter<string>();

  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  onInputChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  togglePassword() {
    this.checkShow = !this.checkShow;
  }
}

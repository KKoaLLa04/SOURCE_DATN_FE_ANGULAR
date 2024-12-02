import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import * as moments from "moment";
import { DaterangepickerDirective, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FieldErrorDisplayComponent} from "../field-error-display/field-error-display.component";
import {NgFor, NgIf} from "@angular/common";
@Component({
    selector: 'app-single-form-date-picker',
    templateUrl: './single-form-date-picker.component.html',
    styleUrls: ['./single-form-date-picker.component.scss'],
    standalone: true,
    imports: [NgxDaterangepickerMd, FormsModule, FieldErrorDisplayComponent,
      ReactiveFormsModule, NgIf, NgFor]
})
export class SingleFormDatePickerComponent implements OnChanges {
  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;

  maxDateValue: any = null;
  minDateValue: any = null;
  @Input() timePicker: boolean = false;
  @Input() maxDate?: number | string = "5680281600";
  @Input() minDate?: number | string = "-2209014390";
  @Input() disabled?: boolean = false;
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm: any[] = [];
  @Input() validateFormServer: any = {};
  @Input() formatInput: string = "DD/MM/YYYY";
  @Input() currentDate: string;
  selected: any = { startDate: null, endDate: null };
  options: any = {
    autoApply: true,
    alwaysShowCalendars: false,
    showCancel: true,
    showClearButton: true,
    linkedCalendars: true,
    singleDatePicker: true,
    showWeekNumbers: true,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true,
    timePicker: this.timePicker,
    locale: { applyLabel: 'Xong', format: this.formatInput }
  };
  constructor() { }

  ngOnChanges() {
    this.currentDate = this.formGroupInput.get(this.formControlNameInput)?.value;
    if (this.maxDate) {
      this.maxDateValue = moments(Number(this.maxDate) * 1000).format('YYYY-MM-DD');
    }
    if (this.minDate) {
      this.minDateValue = moments(Number(this.minDate) * 1000).format('YYYY-MM-DD');
    }
    if (this.currentDate) {
      this.selected = { startDate: null, endDate: null };
      this.selected.startDate = moments(Number(this.currentDate) * 1000);
      this.selected.endDate = moments(Number(this.currentDate) * 1000);
    } else {
      this.selected = null;
    }
    if (this.timePicker) {
      this.options.locale.format = 'hh:mm A DD/MM/YYYY'
    }

  }

  setValueForm(event: any) {
    let dataOutput = ''
    if (event?.startDate) {
      dataOutput = moments(event.startDate.$d).format('X');
    }
    this.formGroupInput.get(this.formControlNameInput).setValue(dataOutput);
    this.formGroupInput.get(this.formControlNameInput).markAsDirty();
  }


  open() {
    this.picker.open();
  }

  clearDate(){
    this.selected = null;
    this.setValueForm(this.selected);
  }

}

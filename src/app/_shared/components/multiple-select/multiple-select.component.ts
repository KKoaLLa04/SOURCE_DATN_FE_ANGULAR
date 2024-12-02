import { NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { TranslocoModule } from '@ngneat/transloco';
declare let $: any;
@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorDisplayComponent,
    NzSelectComponent,
    TranslocoModule,
    NzOptionComponent
  ]
})
export class MultipleSelectComponent {
  @ViewChild('multipleSelect2Element', { static: false }) multipleSelect2ElementRef!: ElementRef;
  @Input() options: Select2[] = [];
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm:any[] = [];
  @Input() validateFormServer:any = {};
  @Input() bgColor:string = "bg-F5F8FA"; // có 2 giá trị là bg-F5F8FA và bg-FFFFFF
  @Input() disabled: boolean = false;
  @Output() changeMultiplSelect = new EventEmitter<any>();
  @Input() placeholder: string = 'Select an option';
  @Input() isShowError:boolean = false;
  @Input() maxTagCount:number = 3;
  countItem:number = 0;
  listOfSelectedValue:string|number[] = [];

  constructor() {
    // todo
  }

  changeMultipleSelect(data:any[]){
    this.changeMultiplSelect.emit(data);
  }
}

import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
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
        TranslateModule,
    ],
})
export class InputComponent implements OnInit {
  @Input() value: string = "";
  @Input() type: string = "text";
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() placeholder: string = "placeholder";
  @Input() validateForm: any[] = [];
  @Input() validateFormServer: any = {};
  @Input() disabled: boolean = false;
  @Input() bgColor: string = "";
  @Input() color: string = "";
  @Input() showBorder: boolean = true;
  @Input() fontWeight: string = 'fw-500';
  @Input() width: string = "";
  @Input() checkEnter: boolean = false;
  @Input() padding: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() autoFocus:boolean = false;
  @Input() isShowError:boolean = false;

  @ViewChild('ipTextInput') ipTextInput: ElementRef;
  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  onInputChange(event: any) {
    this.validateFormServer = {};
    this.value = event.target.value;
    if (this.checkEnter) {
      if (event.keyCode === 13) {
        this.valueChange.emit(this.value);
      }
    } else {
      this.valueChange.emit(this.value);
    }
  }

  ngAfterViewInit() {
    if(this.autoFocus){
      this.autoFocus ? this.ipTextInput.nativeElement.focus() : this.ipTextInput.nativeElement.blur();
    }
  }
}

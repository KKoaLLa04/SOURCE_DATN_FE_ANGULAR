import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  standalone: true,
  imports: [
    NgIf,
    FieldErrorDisplayComponent,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    NgFor
  ]
})
export class InputNumberComponent implements OnInit {
  @Input() value: string | number = "";
  @Input() type: string = "text";
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() placeholder: string = "placeholder";
  @Input() validateForm:any[] = [];
  @Input() validateFormServer:any = {};
  @Input() disabled:boolean = false;
  @Input() bgColor:string = "";
  @Input() color:string = "";
  @Input() showBorder:boolean = true;
  @Input() fontWeight:number = 500;
  @Input() fontSize:string = 'fs-13';
  @Input() width:string = "";
  @Input() height:string = "h-37px";
  @Input() checkEnter:boolean = false;
  @Input() maxLength:number = 100;
  @Input() textCenter:boolean = false;
  @Input() autoFocus:boolean = false;
  @Input() isShowError:boolean = false;
  @Input() min:number = 0;
  @Input() max:number = 999999999;
  @Input() minValue:number = 0;
  @Input() maxValue:number = 10;
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('ipNumber') ipNumber: ElementRef;

  constructor() {
    // todo
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.autoFocus){
      this.autoFocus ? this.ipNumber.nativeElement.focus() : this.ipNumber.nativeElement.blur();
    }
  }

  ngOnChanges(){
    if(this.ipNumber){
      this.autoFocus ? this.ipNumber.nativeElement.focus() : this.ipNumber.nativeElement.blur();
    }
  }

  onInputChange(event: any) {
    this.value = event.target.value;
    const valueNumber = String(this.value).replace(/,/g, '');
    if(this.checkEnter){
      if(event.keyCode  === 13){
        this.valueChange.emit(valueNumber);
      }
    }else{
      this.valueChange.emit(valueNumber);
    }
  }

}

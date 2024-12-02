import { NgIf, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NzOptionComponent, NzSelectComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { TranslocoModule } from '@ngneat/transloco';
@Component({
  selector: 'app-select-2',
  templateUrl: './select-2.component.html',
  styleUrls: ['./select-2.component.scss'],
  standalone: true,
  // viewProviders: [
  //   { provide: ControlContainer, useExisting: FormGroupDirective },
  // ],
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    FieldErrorDisplayComponent,
    TranslateModule,
    NzSelectModule,
    NzSelectComponent,
    TranslocoModule,
    NzOptionComponent
  ]
})
export class Select2Component implements OnInit {
  @Input() options: Select2[] = [];
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm: any[] = [];
  @Input() validateFormServer:any = {};
  @Input() disabled: boolean = false;
  @Output() changeSelect2 = new EventEmitter<any>();
  @Input() bgColor:string = "bg-F3F6F9"; // có 2 giá trị là bg-F3F6F9 và bg-FFFFFF
  @Input() fontWeight:number = 500; // có 2 giá trị 500, 600
  @Input() color:string = "color-464e5f"; // có 2 giá trị color-464e5f hoặc color-009ef7
  @Input() showBorder:boolean = false;
  @Input() allowClear:boolean = true;
  @Input() borderColor:string = "border-color-cadet-grey";
  @Input() placeholder:string = "Select an option";
  @Input() isShowError:boolean = false;
  @Input() isTranslate:boolean = true;
  @Input() width: string = "";
  @Input() value:string | number;
  constructor() {
    // todo
  }

  ngOnInit(): void {
    this.checkSelected();
  }

  checkSelected(){
    if(this.options && this.options.length > 0){
      this.value = this.options.find(item => item.selected)?.value;
    }
  }

  changeValue(event:any){
    if (this.formGroupInput){
      if(this.value != event){
        this.value = event;
        this.validateFormServer = {};
        let valueSelect2 = event ?? "";
        if (this.formGroupInput) {
          this.formGroupInput.get(this.formControlNameInput).setValue(valueSelect2);
        }
        this.changeSelect2.emit(valueSelect2);
      }
    }
    else{
      let valueSelect2 = event ?? "";
      this.changeSelect2.emit(valueSelect2);
    }
  }
}

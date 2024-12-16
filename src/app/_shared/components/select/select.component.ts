import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { TranslateModule } from '@ngx-translate/core';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NgIf, NgFor } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor, FieldErrorDisplayComponent, TranslateModule, TranslocoModule, NzSelectModule]
})
export class SelectComponent implements OnInit {
  @Input() selected_id: any = 0;
  @Input() options: Select2[] = [];
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm: any[] = [];
  @Input() validateFormServer:any = {};
  @Input() disabled: boolean = false;
  @Input() bgColor: string = "";
  @Input() value: string|number|null = null;
  @Input() color: string = "text-color-river-bed";
  @Input() fontWeight: string = 'fw-600';
  @Input() showBorder: boolean = false;
  @Input() borderColor: string = "";
  @Input() width: string = "";
  @Input() isTranslate:boolean = true;
  @Input() selectAll: boolean = false;
  @Output() changeSelect = new EventEmitter<any>();
  @Output() changeSelectAll = new EventEmitter<any>();
  constructor() {
    // todo
  }
  ngOnInit() {
  }

  changeSelectValue(event: any) {
    this.changeSelect.emit(event.target.value);
  }

  changeSelectAllValue(event: any){
    this.changeSelectAll.emit(event.target);
  }

}

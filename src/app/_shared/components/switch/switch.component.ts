import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Switch } from 'src/app/_models/gengeral/switch.model';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  standalone: true,
  imports: [NgIf,NgFor,NgStyle, FormsModule, ReactiveFormsModule, TranslocoModule, FieldErrorDisplayComponent,NzSwitchModule,NzSelectComponent]
})
export class SwitchComponent implements OnInit {
  @Input() option: Switch;
  @Input() formGroupInput?: FormGroup | any;
  @Input() formControlNameInput: string = "";
  @Input() validateForm: any[] = [];
  @Input() disabled: boolean = false;
  @Input() dataSwitch: any = {};
  @Input() color:string = "var(--bs-river-bed)";
  @Input() fontWeight:number = 500;
  @Output() changeSwitch = new EventEmitter<any>();
  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  onChange(event: any) {
    let checked = event.target.checked;
    this.changeSwitch.emit({ checked, dataSwitch: this.dataSwitch });
  }

}

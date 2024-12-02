import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-field-error-display',
    templateUrl: './field-error-display.component.html',
    styleUrls: ['./field-error-display.component.scss'],
    standalone: true,
    imports: [TranslocoModule, NgIf, NgFor]
})
export class FieldErrorDisplayComponent implements OnChanges {
  @Input() errorMsg?: string;
  @Input() errorServer?: any;
  @Input() displayError?: boolean;
  @Input() displayErrorServer?: boolean;
  constructor() { }

  ngOnChanges() {}

}

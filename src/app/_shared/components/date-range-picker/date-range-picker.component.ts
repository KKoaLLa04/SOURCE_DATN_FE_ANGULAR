import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopoverDirective, PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { GlobalStore } from 'src/app/_store/global.store';
import { HelperService } from 'src/app/_services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { iconSVG } from '../../enums/album/icon_svg.enum';
import { HelperAlbumService } from 'src/app/_services/generals/album/helper-album.service';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';
import { FormatRangePickerPipe } from '../../pipe/format-range-picker.pipe';
import { FormsModule } from '@angular/forms';
defineLocale('vi', viLocale);
defineLocale('en', enGbLocale);

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  standalone: true,
  imports: [
    PopoverModule,
    BsDatepickerModule,
    TimepickerModule,
    ButtonComponent,
    NgIf,
    FormatRangePickerPipe,
    FormsModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements OnInit {
  isDateVisible: boolean = true;
  iconSvg = iconSVG;
  bsRangeValue: any[];
  @ViewChild('popoverRef') private _popoverRef: PopoverDirective;

  @Input() startDate: any;
  @Input() endDate: any;
  @Input() color: string = '';
  @Input() formatInput: string = "dd/MM/yyyy";
  @Input() placeholder: string = "";
  @Input() isTimePicker: boolean = false;
  @Input() maxDate?: any | string = "5680281600";
  @Input() minDate?: any | string = "0";
  @Input() isDisabled: boolean = false;
  @Input() isClickFilter: boolean = false;
  @Input() bgColor:string = "bg-color-white-smoke";
  @Input() showBorder:boolean = false;
  @Input() fontWeight: string = 'fw-500';
  @Output() dateRangePickerChange = new EventEmitter<any>();
  @Input() position:any = "bottom";
  @Input() isClear:boolean = false;
  @Input() otherClass:any = "";

  startDateOld:any;
  endDateOld:any;

  constructor(
    private localeService: BsLocaleService,
    private globalStore:GlobalStore,
    private helperService:HelperAlbumService,
    private translateService: TranslateService
  ) {
    this.localeService.use(this.globalStore.language);
    this.translateService.onLangChange.subscribe((ref: any) => {
      this.localeService.use(this.globalStore.language);
    });
  }

  ngOnInit(): void {
    this.isClickFilter = false;
    this.initDateInput();
  }

  initDateInput() {
    if (this.startDate && this.endDate) {
      this.startDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.startDate)) * 1000);
      this.endDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.endDate)) * 1000);
    } else if (this.startDate && !this.endDate) {
      this.startDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.startDate)) * 1000);
      this.endDate = "";
    } else if (!this.startDate && this.endDate) {
      this.startDate = "";
      this.endDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.endDate)) * 1000);
    } else {
      this.startDate = "";
      this.endDate = "";
    }
    this.startDateOld = this.startDate;
    this.endDateOld = this.endDate;

    this.bsRangeValue = [this.startDate, this.endDate];

    if (this.minDate) {
      this.minDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.minDate)) * 1000);
    }

    if (this.maxDate) {
      this.maxDate = new Date(Number(this.helperService.convertToMachineLocalTime(this.maxDate)) * 1000);
    }
  }

  toggleDisabling(): void {
    this.isDisabled = !this.isDisabled;
  }

  showDate() {
    this.isDateVisible = true;
  }

  showTime() {
    this.isDateVisible = false;
  }

  close() {
    this._popoverRef.hide();
    // this.emitOutPut();
  }

  now() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.bsRangeValue = [this.startDate, this.endDate];
  }

  today() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.bsRangeValue = [this.startDate, this.endDate];
  }

  clear() {
    this.startDate = "";
    this.endDate = "";
    this.bsRangeValue = [this.startDate, this.endDate];
  }

  onChangeDate(event: any) {
    this.startDate = event[0];
    this.endDate = event[1];
    this.bsRangeValue = [this.startDate, this.endDate];
    if(this.startDate && this.endDate){
      this.emitOutPut();
    }
  }

  clearData() {
    this.bsRangeValue = [];
    this.dateRangePickerChange.emit({ startDate: null, endDate: null });
    this.close();

  }

  emitOutPut() {
    if(this.startDateOld != this.startDate || this.endDateOld != this.endDate){
      let startDateOutput = this.startDate ? Math.floor(Number(this.startDate.getTime()) / 1000) : null;
      let endDateOutput = this.endDate ? Math.floor(Number(this.endDate.getTime()) / 1000) : null;
      this.startDateOld = this.startDate;
      this.endDateOld = this.endDate;
      this.dateRangePickerChange.emit({ startDate: this.helperService.convertToUTC(startDateOutput), endDate: this.helperService.convertToUTC(endDateOutput) });
      this.close();
    }
  }

}

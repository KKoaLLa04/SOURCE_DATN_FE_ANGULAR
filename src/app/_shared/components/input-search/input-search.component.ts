import {NgClass, NgIf} from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberDirective } from '../../directive/only-number.directive';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  standalone: true,
  imports: [NgIf, NumberDirective, TranslateModule, NgClass]
})
export class InputSearchComponent implements OnInit {
  @Input() value: string = "";
  @Input() type: string = "text";
  @Input() placeholder: string = 'search';
  @Input() disabled:boolean = false;
  @Input() bgColor:string = "";
  @Input() color:string = "";
  @Input() showBorder:boolean = true;
  @Input() fontWeight:string = 'fw-500';
  @Input() width:string = "";
  @Input() checkEnter:boolean = true;
  @Input() showBorderBottom:boolean = false;
  @Input() iconPosition: string = 'left'; // left, right
  @Output() valueChange = new EventEmitter<string>();

  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  onInputChange(event: any) {
    this.value = event.target.value;
    if(this.checkEnter){
      if(event.keyCode  === 13){
        this.valueChange.emit(this.value);
      }
    }else{
      this.valueChange.emit(this.value);
    }
  }

  clickSearch(){
    if (this.value){
      this.valueChange.emit(this.value);
    }
  }
}

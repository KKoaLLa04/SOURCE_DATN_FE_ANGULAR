import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { iconMenuSVG } from '../../enums/menu-svg.enum';

@Component({
    selector: 'app-choose-icon',
    templateUrl: './choose-icon.component.html',
    styleUrls: ['./choose-icon.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class ChooseIconComponent implements OnInit {
  @Input() srcImage:any;
  @Output() checkChooseIcon=  new EventEmitter<any>();
  dataImage = [];
  constructor() { }

  ngOnInit() {
    this.dataImage = Object.values(iconMenuSVG)
    console.log("srcImage",this.srcImage);
  }

  chooseIcon(item){
    let dataEmit = {item};
    this.checkChooseIcon.emit(dataEmit);
  }

}

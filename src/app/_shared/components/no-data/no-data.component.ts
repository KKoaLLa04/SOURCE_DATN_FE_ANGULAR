import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  standalone: true,
  imports:[
    NgClass,
    TranslateModule
  ]
})
export class NoDataComponent implements OnInit {
  @Input() colSpan:number = 0;
  @Input() showBorder:boolean = false;

  constructor() { }

  ngOnInit() {
  }
}

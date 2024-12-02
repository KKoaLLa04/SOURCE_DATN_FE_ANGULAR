import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [NgIf, NgClass]
})
export class ButtonComponent implements OnInit {
  @Input() text: string = "Button";
  @Input() startIconName: string = '';
  @Input() endIconName: string = '';
  @Input() backgroundColor: string = 'bg-color-azure';
  @Input() color: string = 'text-color-white';
  @Input() sizeText: string = "fs-13";
  @Input() sizeButton: string = "btn-sm";
  @Input() fontWeight: string = "fw-600";
  @Input() width: string = "";
  @Input() height: string = "h-37px";
  @Input() filterIcon: string = "";
  @Input() borderClass: string = "";
  @Input() otherClass: string = "";

  @Output() onClick = new EventEmitter<boolean>();
  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

  changeClick() {
    this.onClick.emit(true);
  }

}

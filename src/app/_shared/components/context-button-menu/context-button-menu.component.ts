import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContextMenuOption, IProperty } from 'src/app/_models/context-menu.interface';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'app-context-button-menu',
  templateUrl: './context-button-menu.component.html',
  styleUrls: ['./context-button-menu.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgClass,
    NgFor,
    MatMenuModule,
    NgxPermissionsModule
  ]
})
export class ContextButtonMenuComponent implements OnInit {
  @Input() option: IContextMenuOption[] = [];
  @Output() action: EventEmitter<IProperty> = new EventEmitter();

  @Input() text: string = "Button";
  @Input() backgroundColor: string = 'var(--bs-azure)';
  @Input() color: string = 'var(--bs-white)';
  @Input() startIconName: string = '';
  @Input() endIconName: string = '';
  @Input() sizeText:string = "13px";
  @Input() sizeButton:string = "btn-sm";
  @Input() fontWeight:string = "fw-500";
  @Input() width:string = "";
  @Input() height:string = "h-37px";
  @Input() filterIcon:string = "";
  @Input() showBorder:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleClickOption(event: Event, option: IContextMenuOption): void {
    event.preventDefault();
    this.action.emit({ prop: option.label, value: option.action, type: option.type, data: option.data ?? {} });
  }

  checkImage(parentString: string) {
    const childStrings = [".svg", ".png", ".jpg", ".jpeg", ".gif"];
    const regex = new RegExp(childStrings.join("|"), "i");
    const isMatch = regex.test(parentString);
    return isMatch;
  }

}

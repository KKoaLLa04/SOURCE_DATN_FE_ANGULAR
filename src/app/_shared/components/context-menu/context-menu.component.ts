import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgxPermissionsModule } from 'ngx-permissions';
import { IContextMenuOption, IProperty } from 'src/app/_models/gengeral/context-menu.interface';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  standalone: true,
  imports: [NgIf,NzButtonModule,NzDropDownModule,NgFor,TranslocoModule,NgxPermissionsModule]
})
export class ContextMenuComponent implements OnInit {
  @Input() text: string = "Action";
  @Input() option: IContextMenuOption[] = [];
  @Output() action: EventEmitter<IProperty> = new EventEmitter();
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

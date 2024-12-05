import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { iconSVG } from '../../enums/icon-svg.enum';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.scss'],
  standalone: true,
  imports: [
    TranslateModule
  ]
})
export class ButtonBackComponent implements OnInit {
  icon_svg = iconSVG;
  @Output() onClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  changeClick(){
    this.onClick.emit(true);
  }

}

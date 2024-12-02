import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  standalone: true

})
export class BadgesComponent implements OnInit {
  @Input() text: any = "";
  @Input() bgColor: string = "bg-color-azure";
  @Input() color: string = "text-color-white";
  @Input() size: string = "fs-13";
  @Input() fontWeight: string = "fw-600";
  @Input() type: string = "";
  @Input() width: string = "auto";
  @Input() height: string = "w-35px";
  @Input() display: string = "d-flex";
  @Input() otherClass:string = "";

  // doc https://preview.keenthemes.com/html/metronic/docs/base/badges

  constructor() { }

  ngOnInit() {
  }

}

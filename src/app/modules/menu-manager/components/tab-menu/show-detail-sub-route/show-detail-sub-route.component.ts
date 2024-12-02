import { Component, OnInit, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-show-detail-sub-route',
    templateUrl: './show-detail-sub-route.component.html',
    styleUrls: ['./show-detail-sub-route.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class ShowDetailSubRouteComponent implements OnInit {
  @Input() dataSubRoute:any;
  constructor() { }

  ngOnInit() {
  }

}

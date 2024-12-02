import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-aside-menu',
    templateUrl: './aside-menu.component.html',
    styleUrls: ['./aside-menu.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
})
export class AsideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

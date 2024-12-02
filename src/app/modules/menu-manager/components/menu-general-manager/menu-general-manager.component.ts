import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPackageMenuManagerComponent } from '../tab-package-menu/list-package-menu-manager/list-package-menu-manager.component';
import { ListMenuManagerComponent } from '../tab-menu/list-menu-manager/list-menu-manager.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-menu-general-manager',
    templateUrl: './menu-general-manager.component.html',
    styleUrls: ['./menu-general-manager.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      NgIf, 
      ListMenuManagerComponent, 
      ListPackageMenuManagerComponent
    ]
})
export class MenuGeneralManagerComponent implements OnInit {
  tabActive: string = "tab1";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param:any)=>{
      if(param.tab){
        this.tabActive = param.tab;
      }else{
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: "tab1"
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }

  changeTab(value: string): void {
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }

}

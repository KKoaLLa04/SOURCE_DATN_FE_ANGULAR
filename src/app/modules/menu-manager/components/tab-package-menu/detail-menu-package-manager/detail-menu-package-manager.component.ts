import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd/tree';
import { MenuManagerService } from 'src/app/_services/menu-manager/menu-manager.service';
import { NgIf, NgFor } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-detail-menu-package-manager',
    templateUrl: './detail-menu-package-manager.component.html',
    styleUrls: ['./detail-menu-package-manager.component.scss'],
    standalone: true,
    imports: [
      TranslocoModule, 
      NgIf, 
      NgFor, 
      NzTreeComponent, 
    ]
})
export class DetailMenuPackageManagerComponent implements OnInit {
  searchValue: string = '';
  menuInfo: any = {
    layoutApply: 0,
    menuPackageCode: '',
    menuPackageName: '',
    customerApply: 0
  };
  dataMenuLeft: any[] = [];
  dataMenuRight: any[] = [];
  checkShowMenu:boolean = false;
  @Input() menuPackageManagerId:string;
  @Output() checkCloseDetailMenuPackage = new EventEmitter<any>();
  constructor(
    private menuManagerService: MenuManagerService
  ) { }

  ngOnInit() {
    if (this.menuPackageManagerId) {
      this.getDataDetailMenuPackageManager();
    }
  }

  getDataDetailMenuPackageManager() {
    this.menuManagerService.getDetailMenuPackage(this.menuPackageManagerId).subscribe((res: any) => {
      this.convertDataMenu(res);
    })
  }

  convertDataMenu(dataMenu: any) {
    // convert infomation menu
    this.menuInfo.layoutApply = dataMenu.data.layouts.length;
    this.menuInfo.menuPackageCode = dataMenu.data.code;
    this.menuInfo.menuPackageName = dataMenu.data.name;
    this.menuInfo.customerApply = 10;

    // convert data menu left
    this.dataMenuLeft = dataMenu.data.children.filter(el => el.parentId == "");
    // convert data menu right
    dataMenu.data.children.forEach((element, index) => {
      if (element.parentId == "") {
        this.dataMenuRight.push({
          icon: element.icon,
          key: element.title,
          title: element.name,
          menuRouter: element.url,
          id: element.id,
          children: this.convertDataMenuRigth(dataMenu.data.children, element.id)
        })
      }
    });

    setTimeout(() => {
      this.checkShowMenu = true;
    }, 500);

  }

  convertDataMenuRigth(dataMenu: any, parentId: string) {
    let dataChild:any[] = [];
    dataMenu.forEach((element, index) => {
      if (element.parentId == parentId) {
        dataChild.push({
          icon: element.icon,
          key: element.title,
          title: element.name,
          menuRouter: element.url,
          id: element.id,
          children: this.convertDataMenuRigth(dataMenu, element.id)
        })
      }
    });
    return dataChild;
  }

  nzEvent(event: NzFormatEmitEvent): void {
    event.node.isExpanded = !event.node.isExpanded;
  }

  cancelDetailMenuPackage(){
    this.checkCloseDetailMenuPackage.emit({status:1,id:null});
  }

  updateMenuPackage(){
    this.checkCloseDetailMenuPackage.emit({status:2,id:this.menuPackageManagerId});
  }

}

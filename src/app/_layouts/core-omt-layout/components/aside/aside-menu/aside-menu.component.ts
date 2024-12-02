import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {InputSearchComponent} from "../../../../../_shared/components/input-search/input-search.component";
import {NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
export  interface MenuLayoutChildren {
  name: string
  url: string
  icon: string
  permissionCode: string
  code: string
  children: MenuLayoutChildren[]
}
@Component({
    selector: 'app-aside-menu',
    templateUrl: './aside-menu.component.html',
    styleUrls: ['./aside-menu.component.scss'],
    standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslocoModule, InputSearchComponent, NgIf, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, NgClass, NgStyle],
})
export class AsideMenuComponent implements OnInit {

  menuLayout: MenuLayoutChildren[] = [];
  constructor() {}

  //Thêm code
  //Thêm phần danh sách
  ngOnInit(): void {
    this.menuLayout = [
      {icon: "assets/images/svg/address.svg", name:"Trang chủ", url:"/home", permissionCode : '', code: 'home', children: []},
      {icon: "assets/images/svg/address.svg", name:"Thống kê điểm danh", url:"/staff/list_attendance_statistic", permissionCode : '', code: 'statistic', children: []},
      {icon: "assets/images/svg/icon-sidebar/icon-ql-khach-hang.svg", name:"Điểm danh", url:"/staff/list_attendance", permissionCode : '', code: 'attendance', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Menu khách hàng", url:"/menu-manager", permissionCode : '', code: 'customer-manager', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-module.svg", name:"Danh sách Module", url:"/module", permissionCode : '', code: 'module', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-role.svg", name:"Phân quyền", url:"/role", permissionCode : '', code: 'role', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-nam.svg", name:"Năm học", url:"/school-year", permissionCode : '', code: 'school-year', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-khoi.svg", name:"Khối", url:"/grade", permissionCode : '', code: 'grade', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-ql-nguoi-dung.svg", name:"Người dùng", url:"/user-manager", permissionCode : '', code: 'grade', children: []},
      // {icon: "assets/images/svg/icon-sidebar/icon-csdl.svg", name:"CSDL", url:"/moet", permissionCode : '', code: 'grade', children: []},
    ]
  }

}

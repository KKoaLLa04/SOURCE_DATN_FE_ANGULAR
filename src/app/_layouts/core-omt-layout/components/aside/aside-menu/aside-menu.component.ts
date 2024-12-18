import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {InputSearchComponent} from "../../../../../_shared/components/input-search/input-search.component";
import {NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import { AccessType } from 'src/app/_shared/enums/access-type.enum';
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
    console.log(localStorage.getItem('access_type'))
    let layout = localStorage.getItem('access_type');
    if(Number(layout) == Number(AccessType.MANAGER)){
      this.menuLayout = [
        {icon: "assets/images/svg/address.svg", name:"Trang chủ", url:"/home", permissionCode : '', code: 'home', children: []},
        {icon: "assets/images/svg/address.svg", name:"Thống kê điểm danh", url:"/staff/list_attendance_statistic", permissionCode : '', code: 'statistic', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-khach-hang.svg", name:"Điểm danh", url:"/staff/list_attendance", permissionCode : '', code: 'attendance', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Môn học", url:"/staff/subject", permissionCode : '', code: 'subject', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Công nhân viên chức", url:"/staff/teacher", permissionCode : '', code: 'teacher', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Niên khóa", url:"/staff/academic", permissionCode : '', code: 'academic', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Lớp học", url:"/staff/class-study", permissionCode : '', code: 'class-study', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Học sinh", url:"/staff/student", permissionCode : '', code: 'student', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Phụ huynh", url:"/staff/parent", permissionCode : '', code: 'parent', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Năm học", url:"/staff/school-year", permissionCode : '', code: 'school-year', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Sổ điểm", url:"/staff/note-mark", permissionCode : '', code: 'note-mark', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Quản lý đơn", url:"/staff/ticket", permissionCode : '', code: 'ticket', children: []},
        {icon: "assets/images/svg/icon-sidebar/icon-ql-menu-khach-hang.svg", name:"Điểm số", url:"/staff/exam", permissionCode : '', code: 'exam', children: []},
      ]
    }else if (Number(layout) == Number(AccessType.TEACHER)){
      this.menuLayout = [
        {icon: "assets/images/svg/address.svg", name:"Trang chủ", url:"/home", permissionCode : '', code: 'home', children: []},
        {icon: "assets/images/svg/address.svg", name:"Điểm danh", url:"/teacher/attendance", permissionCode : '', code: 'attendance', children: []},
        // {icon: "assets/images/svg/address.svg", name:"Lịch sử điểm danh", url:"/teacher/history-attendance", permissionCode : '', code: 'history_attendance', children: []},
        // {icon: "assets/images/svg/address.svg", name:"Học sinh", url:"/teacher/student", permissionCode : '', code: 'student', children: []},
      ]
    }else if (Number(layout) == Number(AccessType.GUARDIAN)){
      this.menuLayout = [
        {icon: "assets/images/svg/address.svg", name:"Trang chủ", url:"/home", permissionCode : '', code: 'home', children: []},
        // {icon: "assets/images/svg/address.svg", name:"Lịch sử điểm danh", url:"/parent/list_attendance_statistic", permissionCode : '', code: 'statistic', children: []},
        {icon: "assets/images/svg/address.svg", name:"Đơn xin nghỉ", url:"/parent/ticket", permissionCode : '', code: 'ticket', children: []},
        {icon: "assets/images/svg/address.svg", name:"Thời khóa biểu", url:"/parent/timetable", permissionCode : '', code: 'timetable', children: []},
        // {icon: "assets/images/svg/address.svg", name:"Điểm con", url:"/parent/note-mark", permissionCode : '', code: 'note-mark', children: []},
      ]
    }
  }

}

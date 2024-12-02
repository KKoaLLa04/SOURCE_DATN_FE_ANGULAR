import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as moment from "moment";
import {JsonPipe, NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
@Component({
    selector: 'app-breadcrumbs:not(2)',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, NgIf, NgStyle, JsonPipe, NgClass]
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  showBreadcrumbs = [
    { url: '/', title: 'Trang chủ', icon: 'fa', color: null },
    { url: '/', title: `${moment().format('dddd')}, ${moment().format('DD/MM/YYYY')}`, icon: null, color: null }
  ];
  listBreadCrumbs = [
    {
      data: [
        { url: '/', title: 'Trang chủ', icon: 'fa', color: null },
        { url: '/', title: `${moment().format('dddd')}, ${moment().format('DD/MM/YYYY')}`, icon: null, color: null }
      ], type: 'home'
    },
  ];


  constructor(
    private router: Router, private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    // this.customUrl();//gọi lần đầu chạy prj
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
    //   this.customUrl();//chạy khi thay đổi router
    // });
  }

  customUrl() {
    let root: ActivatedRoute = this.route.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    console.log(this.breadcrumbs)
    this.breadcrumbs = [...this.breadcrumbs];
    console.log(this.breadcrumbs[this.breadcrumbs.length - 1])
    this.handelBreadcrumbs(this.breadcrumbs[this.breadcrumbs.length - 1].url);
  }

  handelBreadcrumbs(param: string) {
    this.showBreadcrumbs = [];
    // let data = param.split('/');
    const flag = this.listBreadCrumbs.find(i => i.type === param);
    this.listBreadCrumbs.forEach(i => {
      // i.type === param
    });
    if (flag) {
      this.showBreadcrumbs = flag.data;
      return;
    }
    // data.forEach(item => {
    //     const flag = this.listBreadCrumbs.find(i => i.type === param);
    //     if (flag) {
    //         this.showBreadcrumbs = flag.data;
    //         return;
    //     }
    // });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
    let children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) continue;
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      let data = routeURL.split('/');

      if (data.length >= 2 && this.isValidGUID(data[1])) {
        routeURL = data[0];
        if (data[0] == 'create-or-edit' && this.isValidGUID(data[1])) {//chỉnh sửa nhân viên
          routeURL = data[0] + '/type3'
        }
      }

      if (this.isValidGUID(data[0])) {
        if (data.length >= 2) {
          routeURL = 'type1/' + data[1];
        }
        else {
          routeURL = 'type1';
        }
      }

      if (data.length >= 3 && this.isValidGUID(data[2])) {
        routeURL = data[0] + '/' + data[1];
      }

      url += `/${routeURL}`;
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  isValidGUID(str) {
    // Regex to check valid
    // GUID (Globally Unique Identifier)
    const regex = "^[{]?[0-9a-fA-F]{8}"
      + "-([0-9a-fA-F]{4}-)"
      + "{3}[0-9a-fA-F]{12}[}]?$";
    const regex1 = new RegExp(regex);
    return regex1.test(str)
    // Compile the ReGex
  }
}
export interface Breadcrumb {
  label: string;
  url: string;
}

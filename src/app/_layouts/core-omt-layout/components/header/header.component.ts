import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router, RouterLink } from '@angular/router';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../core/layout.service';
import {MenuComponent} from '../../kt/components';
import { TopbarComponent } from '../topbar/topbar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { NgClass, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        RouterLink,
        HeaderMenuComponent,
        PageTitleComponent,
        TopbarComponent,
        ButtonComponent,
        SelectComponent
    ],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerContainerCssClasses: string = '';
  asideDisplay: boolean = true;
  headerLeft: string = 'menu';
  pageTitleCssClasses: string = '';
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  @ViewChild('ktPageTitle', {static: true}) ktPageTitle: ElementRef;

  optionSchoolYear: Select2[] = [];
  accessType: any = 1;
  optionChildren: Select2[] = [];
  
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private router: Router,
    private showMessageService: ShowMessageService
    ) {
    this.routingChanges();
  }

  ngOnInit(): void {
    this.accessType = localStorage.getItem("access_type")
    if(this.accessType!=3){
      this.getSchoolYear();
    }else{
      let data = JSON.parse(localStorage.getItem('UserInfo'));
      if(!data?.students?.length){
        localStorage.clear();
        this.showMessageService.error("Phụ huynh hiện tại không có con trong hệ thống")
        this.router.navigate(['/auth/login']);
      }
      this.getChidlren();
    }
    this.headerContainerCssClasses = this.layout.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }

  getChidlren(){
    let data = JSON.parse(localStorage.getItem('UserInfo'));
    data.students?.map((item) => {
      this.optionChildren.push({
        label: item.fullname + ' - ' + item.className,
        value: item.id,
        selected: item.id == localStorage.getItem('child_id'),
        data: item,
      })
    })
  }

  getSchoolYear(){
    let data = JSON.parse(localStorage.getItem('SchoolYear'));
    data.map((item) => {
      this.optionSchoolYear.push({
        label: item.name,
        value: item.id,
        selected: item.id == localStorage.getItem('SchoolYearFirst')
      })
    })
  }

  onChangeSelectYear(value: any){
    localStorage.setItem('SchoolYearFirst', value);
    window.location.reload();
  }

  onChangeChildrent(data: any){
    let selectData = data.options[data.selectedIndex].text;
    let value = data.value;
    localStorage.setItem('child_id', value);
    localStorage.setItem('child_name', selectData);

    this.optionChildren.map((item) => {
      if(item.value == value){
        localStorage.setItem('classId', item?.data?.classId);
        localStorage.setItem('className', item?.data?.className);
      }
    })
    window.location.reload();
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (this.pageTitleAttributes.hasOwnProperty(key)) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
  }
}

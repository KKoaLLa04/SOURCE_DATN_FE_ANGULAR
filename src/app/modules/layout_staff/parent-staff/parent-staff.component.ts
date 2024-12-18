import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ParentService } from '../services/parent.service';
import { Router } from '@angular/router';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { IProperty } from 'src/app/_models/context-menu.interface';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';
import { StatusActiveDirective } from 'src/app/_shared/directive/status-active.directive';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';

@Component({
  selector: 'app-parent-staff',
  templateUrl: './parent-staff.component.html',
  styleUrls: ['./parent-staff.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    ContextMenuComponent,
    GenderDirective,
    StatusActiveDirective,
    PaginationComponent
  ]
})
export class ParentStaffComponent implements OnInit {
  iconSvg = iconSVG
   dataList: any = [];
   keyword: string = '';
   pageSize = PAGE_SIZE_DEFAULT;
   pageIndex = PAGE_INDEX_DEFAULT
   sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT

    constructor(
      private globalStore: GlobalStore,
      private showMessageSerivce: ShowMessageService,
      private parentService: ParentService,
      private router: Router
    ) { }
  
    ngOnInit() {
      this.getListParent();
    }
  
    onChangeAssignPage(): void{
      this.router.navigateByUrl('staff/subject/assign');
    }

    handleAction(event: IProperty): void{
        const actionHandlers = {
          '1': () => {},
          '2': () => {},
          '3': () => {}
        };
    
        const handler = actionHandlers[event.type];
        if (handler) {
          handler();
        }
      }
    
    paginationChange(event: any) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getListParent();
    }
  
    private getListParent(): void{
      this.globalStore.isLoading = true;
      
      let dataRequest = {
        keyword: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }

      this.parentService.getListParent(dataRequest).subscribe((res: any) => {
        this.dataList = res;
        console.log(res);
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }
}

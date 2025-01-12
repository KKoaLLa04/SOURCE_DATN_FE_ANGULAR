import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../layout_staff/services/class-study.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-history-attendance-teacher',
  templateUrl: './history-attendance-teacher.component.html',
  styleUrls: ['./history-attendance-teacher.component.scss'],
  standalone: true,
  imports: [
    SelectComponent,
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent,
    PaginationComponent,
    NoDataComponent,
    NgIf,
    StatusClassDirective
  ]
})
export class HistoryAttendanceTeacherComponent implements OnInit {

   dataList: any = [];
    iconSvg = iconSVG;
    keyWord: string = '';
    pageIndex = PAGE_INDEX_DEFAULT;
    pageSize = PAGE_SIZE_DEFAULT;
    collectionSize: number = 0;
    sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
    dataOptionsStatus: Select2[] = [
      {
        label: "Test",
        value: ""
      },
      {
        label: "Test",
        value: ""
      }
    ]
    constructor(
      private globalStore: GlobalStore,
      private showMessageSerivce: ShowMessageService,
      private classStudyService: ClassStudyService,
      private router: Router,
      private modalService: NgbModal,
    ) { }
  
    ngOnInit() {
      this.getListDataClasses();
    }
  
    paginationChange(event: any) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getListDataClasses();
    }
  
    onChangeDetailPage(classId: any): void{
      this.router.navigateByUrl(`teacher/history-attendance/${classId}`)
    }
  
    onSearch(value: string): void{
      this.pageIndex = PAGE_INDEX_DEFAULT;
      this.pageSize = PAGE_SIZE_DEFAULT
      this.keyWord = value;
      this.getListDataClasses()
    }
  
    private getListDataClasses(): void{
      this.globalStore.isLoading = true;
      this.classStudyService.getListClassTeacher().subscribe((res: any) => {
        this.dataList = res;
        this.globalStore.isLoading = false;
      }, (err) =>{
        this.showMessageSerivce.error(err);
      })
    }

}

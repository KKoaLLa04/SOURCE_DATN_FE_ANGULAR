import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { StudentLayoutTeacherService } from '../services/student-layout-teacher.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { NgFor, NgIf } from '@angular/common';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';

@Component({
  selector: 'app-parents-layout-teacher',
  templateUrl: './parents-layout-teacher.component.html',
  styleUrls: ['./parents-layout-teacher.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    PaginationComponent,
    NoDataComponent,
    NgFor,
    FormatTimePipe,
    NgIf,
    InputSearchComponent,
    GenderDirective
  ]
})
export class ParentsLayoutTeacherComponent implements OnInit {
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  keyWord: string = '';
  dataList: any = [];
  
  constructor(
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService,
    private studentLayoutTeacherService: StudentLayoutTeacherService
  ) { }

  ngOnInit() {
    this.getDataForm();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataForm();
  }

  onSearch(value: string): void{
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.pageSize = PAGE_SIZE_DEFAULT;
    this.keyWord = value;
    this.getDataForm();
  }

  getDataForm(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      keyWord: this.keyWord
    }
    this.studentLayoutTeacherService.getListParents(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { NoteMarkService } from '../../services/note-mark.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-mark-detail',
  templateUrl: './note-mark-detail.component.html',
  styleUrls: ['./note-mark-detail.component.scss'],
  standalone: true,
  imports: [
    PaginationComponent,
    NgFor,
    NgIf,
    NoDataComponent,
    FormatTimePipe,
    ButtonComponent,
    InputComponent
  ]
})
export class NoteMarkDetailComponent implements OnInit {
  dataList: any;
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
  classId: any;
  subject_id = 1;
  constructor(
    private globalStore: GlobalStore,
    private noteMarkService: NoteMarkService,
    private showMessageService: ShowMessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('id');
      this.getListNoteMark();
    });
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private getListNoteMark(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: this.pageSize,
      page: this.pageIndex,
      search: this.keyWord,
      subject_id: this.subject_id,
      class_id: this.classId
    }
    this.noteMarkService.getListNoteMarkToSubject(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      // this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  onChangeEditType(item: any): void{
    item.isEdit = true;
  }
}

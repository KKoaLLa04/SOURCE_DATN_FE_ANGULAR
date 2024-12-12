import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-modal-assign-parent',
  templateUrl: './modal-assign-parent.component.html',
  styleUrls: ['./modal-assign-parent.component.scss'],
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
    InputSearchComponent
  ]
})
export class ModalAssignParentComponent implements OnInit {
  @Input() dataModal: any;
  dataList: any;
  formGroup: FormGroup;
  dataFromParent: any;
  validationMessagesServer = {
    name: {},
    code: {},
    requestLayout: {}
  };
  isUpdate: boolean = false;
  keyWord: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT
  parentId: number = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService,
    private studentSerivce: StudentService
  ) { }

  onClickRadio(parentId: number){
    this.parentId = parentId;
    console.log(this.parentId)
  }

  ngOnInit(): void {
    this.getDataForm();
    this.dataFromParent = this.dataModal.dataFromParent;
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataForm();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onClickSave(){
    if(this.parentId){
      let dataInput = {
        student_id: this.dataFromParent.data,
        parent_id: this.parentId
      };

      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          this.globalStore.isLoading = false;
          this.showMessageService.success("Gán phụ huynh cho học sinh thành công")
          // this.closeModal(true)
          this.activeModal.close(true);
        },
        (err: any) => {
          this.globalStore.isLoading = false;
        }
      );
    }else{
      this.activeModal.close(false);
    }
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
      keyword: this.keyWord
    }
    this.studentSerivce.getListParents(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

}
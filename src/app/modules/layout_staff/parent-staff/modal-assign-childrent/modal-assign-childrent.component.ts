import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { GlobalStore } from 'src/app/_store/global.store';
import { ParentService } from '../../services/parent.service';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';

@Component({
  selector: 'app-modal-assign-childrent',
  templateUrl: './modal-assign-childrent.component.html',
  styleUrls: ['./modal-assign-childrent.component.scss'],
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
export class ModalAssignChildrentComponent implements OnInit {
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
  childrenId: number = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private globalStore: GlobalStore,
    private showMessageService: ShowMessageService,
    private parentService: ParentService
  ) { }

  onClickRadio(childrenId: number){
    this.childrenId = childrenId;
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
    if(this.childrenId){
      let dataInput = {
        id: this.dataFromParent.data,
        student_id: [this.childrenId]
      };

      this.globalStore.isLoading = true;

      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          this.globalStore.isLoading = false;
          this.showMessageService.success("Gán học sinh cho phụ huynh thành công")
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
    this.parentService.getListStudent(dataRequest).subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.collectionSize = res?.data.totalItems;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }
}

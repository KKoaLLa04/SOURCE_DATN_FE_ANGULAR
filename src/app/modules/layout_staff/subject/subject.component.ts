import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectFormComponent } from './subject-form/subject-form.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf
  ]
})
export class SubjectComponent implements OnInit {
  dataList: any = [];
  iconSvg = iconSVG
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private subjectService: SubjectService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getListSubject();
  }

  // onChangeAssignPage(): void{
  //   this.router.navigateByUrl('staff/subject/assign');
  // }

  create() {
          const modalRef = this.modalService.open(SubjectFormComponent, {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            backdrop: 'static', // prevent click outside modal to close modal
            centered: false, // vị trí hiển thị modal ở giữa màn hình
            size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
          });
      
          let data = {
            titleModal: 'Thêm môn học mới',
            btnCancel: 'btnAction.cancel',
            btnAccept: 'btnAction.save',
            isHiddenBtnClose: false, // hidden/show btn close modal
            dataFromParent: {
              service: this.subjectService,
              apiSubmit: (dataInput: any) => this.subjectService.createNewSubject(dataInput),
              nameForm: 'create',
            },
          };
      
          modalRef.componentInstance.dataModal = data;
          modalRef.result.then(
            (result: boolean) => {
              if (result) {
                this.getListSubject();
              }
            },
            (reason) => { }
          );
        }
  
        update(item: any): void{
            const modalRef = this.modalService.open(SubjectFormComponent, {
              scrollable: true,
              windowClass: 'myCustomModalClass',
              keyboard: false,
              backdrop: 'static', // prevent click outside modal to close modal
              centered: false, // vị trí hiển thị modal ở giữa màn hình
              size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
            });
        
            let data = {
              titleModal: 'Chỉnh sửa môn học',
              btnCancel: 'btnAction.cancel',
              btnAccept: 'btnAction.save',
              isHiddenBtnClose: false, // hidden/show btn close modal
              dataFromParent: {
                data: item,
                service: this.subjectService,
                apiSubmit: (dataInput: any) => this.subjectService.updateSubject(dataInput),
                nameForm: 'update',
              },
            };
        
            modalRef.componentInstance.dataModal = data;
            modalRef.result.then(
              (result: boolean) => {
                if (result) {
                  this.getListSubject();
                }
              },
              (reason) => { }
            );
          }

  private getListSubject(): void{
    this.globalStore.isLoading = true;

    this.subjectService.getListSubject().subscribe((res: any) => {
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }

}

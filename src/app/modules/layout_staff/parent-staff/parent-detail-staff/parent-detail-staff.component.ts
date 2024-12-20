import { Component, OnInit } from '@angular/core';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { ParentService } from '../../services/parent.service';
import { NgFor, NgIf } from '@angular/common';
import { GenderDirective } from 'src/app/_shared/directive/gender.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { ModalAssignChildrentComponent } from '../modal-assign-childrent/modal-assign-childrent.component';
import { ModalUnUnsignChildrentComponent } from '../modal-un-unsign-childrent/modal-un-unsign-childrent.component';

@Component({
  selector: 'app-parent-detail-staff',
  templateUrl: './parent-detail-staff.component.html',
  styleUrls: ['./parent-detail-staff.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    InputComponent,
    FormatTimePipe,
    ButtonComponent,
    CheckboxComponent,
    NgFor,
    GenderDirective,
    NgIf
  ]
})
export class ParentDetailStaffComponent implements OnInit {
  iconSvg = iconSVG
  parentId: string;
   dataDetail: any;
   constructor(
     private globalStore: GlobalStore,
     private parentService: ParentService,
     private route: ActivatedRoute,
     private modalService: NgbModal,
     private showMessageService: ShowMessageService
   ) { }
 
   ngOnInit() {
     this.route.paramMap.subscribe((params) => {
       this.parentId = params.get('id');
       this.getDetailParent();
     });
   }
 
   getDetailParent(){
     this.globalStore.isLoading = true;
 
     this.parentService.getDetail(this.parentId).subscribe((res: any) => {
       this.dataDetail = res?.data
       this.globalStore.isLoading = false;
     },(err) => {
       this.globalStore.isLoading = false;
       this.showMessageService.error(err);
     })
   }
 
   assignChildrent(id: any): void{
     const modalRef = this.modalService.open(ModalAssignChildrentComponent, {
       scrollable: true,
       windowClass: 'myCustomModalClass',
       keyboard: false,
       backdrop: 'static', // prevent click outside modal to close modal
       centered: false, // vị trí hiển thị modal ở giữa màn hình
       size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
     });
 
     let data = {
       titleModal: 'Gán Phụ huynh cho học sinh',
       btnCancel: 'btnAction.cancel',
       btnAccept: 'btnAction.save',
       isHiddenBtnClose: false, // hidden/show btn close modal
       dataFromParent: {
         data: id,
         service: this.parentService,
         apiSubmit: (dataInput: any) => this.parentService.assignStudent(dataInput),
         nameForm: 'update',
       },
     };
 
     modalRef.componentInstance.dataModal = data;
     modalRef.result.then(
       (result: boolean) => {
         if (result) {
           this.getDetailParent();
         }
       },
       (reason) => { }
     );
   }

   removeUnAssignStudent(idStudent: any, idParent: any){
       const modalRef = this.modalService.open(ModalUnUnsignChildrentComponent, {
         scrollable: true,
         windowClass: 'myCustomModalClass',
         keyboard: false,
         backdrop: 'static', // prevent click outside modal to close modal
         centered: false, // vị trí hiển thị modal ở giữa màn hình
         size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
       });
   
       let data = {
         titleModal: 'Gỡ mối quan hệ phụ huynh - học sinh',
         btnCancel: 'btnAction.cancel',
         btnAccept: 'btnAction.save',
         isHiddenBtnClose: false, // hidden/show btn close modal
         dataFromParent: {
           nameForm: 'create',
         },
       };
   
       modalRef.componentInstance.dataModal = data;
       modalRef.result.then(
         (result: boolean) => {
           if (result) {
             this.globalStore.isLoading = true;
             let dataRequest = {
              id: idParent,
              student_id: [idStudent]
             }
             this.parentService.unAssignStudent(dataRequest).subscribe((res) => {
               this.showMessageService.success("Gỡ mối quan hệ phụ huynh - học sinh thành công");
               this.getDetailParent();
             }, (err) => {
               this.globalStore.isLoading = false
               this.showMessageService.error(err)
             })
           }
         },
         (reason) => { }
       );
     }

}

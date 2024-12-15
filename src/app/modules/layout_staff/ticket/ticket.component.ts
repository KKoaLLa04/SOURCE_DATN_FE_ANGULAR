import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { GlobalStore } from 'src/app/_store/global.store';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { TicketService } from '../services/ticket.service';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusActiveClassBgColorDirective } from 'src/app/_shared/directive/status-active-class-bg-color.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgreeTicketComponent } from './modal-agree-ticket/modal-agree-ticket.component';
import { ModalDenyTicketComponent } from './modal-deny-ticket/modal-deny-ticket.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    ButtonComponent,
    NoDataComponent,
    NgIf,
    InputSearchComponent,
    SelectComponent,
    StatusActiveClassBgColorDirective
  ]
})
export class TicketComponent implements OnInit {
 dataList: any = [];

  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private router: Router,
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getListTicket();
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
  }

  agreeTicket(id: any){
    const modalRef = this.modalService.open(ModalAgreeTicketComponent, {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            backdrop: 'static', // prevent click outside modal to close modal
            centered: false, // vị trí hiển thị modal ở giữa màn hình
            size: 'md', // 'sm' | 'md' | 'lg' | 'xl',
          });

          let data = {
            titleModal: 'Xác nhận đơn xin nghỉ',
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
                  id: id
                }
                this.ticketService.confirmTicket(dataRequest).subscribe((res) => {
                  this.showMessageSerivce.success("Xác nhận đơn xin nghỉ thành công");
                  this.getListTicket();
                }, (err) => {
                  this.globalStore.isLoading = false
                  this.showMessageSerivce.error(err)
                })
              }
            },
            (reason) => { }
          );
  }

  denyTicket(item: any): void{
    const modalRef = this.modalService.open(ModalDenyTicketComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'md', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Từ chối đơn xin nghỉ',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        data: item,
        service: this.ticketService,
        apiSubmit: (dataInput: any) => this.ticketService.denyTicket(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListTicket();
        }
      },
      (reason) => { }
    );
  }

  private getListTicket(): void{
    this.globalStore.isLoading = true;

    this.ticketService.getListTicket().subscribe((res: any) => {
      this.dataList = res;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { TicketService } from '../../layout_staff/services/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateTicketComponent } from './modal-create-ticket/modal-create-ticket.component';
import { ModalDeleteTicketComponent } from './modal-delete-ticket/modal-delete-ticket.component';
import { StatusActiveClassBgColorDirective } from 'src/app/_shared/directive/status-active-class-bg-color.directive';

@Component({
  selector: 'app-ticket-parent',
  templateUrl: './ticket-parent.component.html',
  styleUrls: ['./ticket-parent.component.scss'],
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
export class TicketParentComponent implements OnInit {
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

  onOpenModalCreate(): void{
    const modalRef = this.modalService.open(ModalCreateTicketComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
        });

        let data = {
          titleModal: 'Tạo đơn xin nghỉ',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            service: this.ticketService,
            apiSubmit: (dataInput: any) => this.ticketService.addNewTicket(dataInput),
            nameForm: 'create',
          },
        };

        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getListTicket()
            }
          },
          (reason) => { }
        );
  }

  removeTicket(id: any){
      const modalRef = this.modalService.open(ModalDeleteTicketComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'md', // 'sm' | 'md' | 'lg' | 'xl',
      });

      let data = {
        titleModal: 'Hủy đơn xin nghỉ',
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
              leave_request_id: id
            }
            this.ticketService.removeTicket(dataRequest).subscribe((res) => {
              this.showMessageSerivce.success("Hủy đơn xin nghỉ thành công");
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

  private getListTicket(): void{
    this.globalStore.isLoading = true;

    this.ticketService.getListTicketParent().subscribe((res: any) => {
      this.dataList = res;
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageSerivce.error(err);
    })
  }
}

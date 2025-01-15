import { Component, OnInit } from '@angular/core';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignParentComponent } from '../modal-assign-parent/modal-assign-parent.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { NgFor, NgIf } from '@angular/common';
import { StatusClassStudentDirective } from 'src/app/_shared/directive/status-class-student.directive';
import { CardStudentComponent } from 'src/app/_shared/components/card-student/card-student.component';
import { StatusStudentDirective } from 'src/app/_shared/directive/status-student.directive';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  standalone: true,
  imports: [
    CardStudentComponent,
    ButtonBackComponent,
    InputComponent,
    FormatTimePipe,
    ButtonComponent,
    NgFor,
    StatusClassStudentDirective,
    NgIf,
    RouterLink,
    StatusClassStudentDirective
  ]
})
export class StudentDetailComponent implements OnInit {
  iconSvg = iconSVG
  studentId: any;
  dataDetail: any;
  constructor(
    private globalStore: GlobalStore,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private showMessageService: ShowMessageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      this.getDetailStudent();
    });
  }

  getDetailStudent(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      id: this.studentId
    }

    this.studentService.getStudentDetail(dataRequest).subscribe((res: any) => {
      this.dataDetail = res?.data;
      console.log(res?.data);
      this.globalStore.isLoading = false;
    },(err) => {
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  assignParent(id: any): void{
    const modalRef = this.modalService.open(ModalAssignParentComponent, {
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
        service: this.studentService,
        apiSubmit: (dataInput: any) => this.studentService.assignParent(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getDetailStudent();
        }
      },
      (reason) => { }
    );
  }

}

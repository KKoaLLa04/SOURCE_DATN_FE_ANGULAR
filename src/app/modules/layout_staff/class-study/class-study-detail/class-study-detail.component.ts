import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignSubjectComponent } from '../modal-assign-subject/modal-assign-subject.component';
import { ModalDeleteSubjectComponent } from '../modal-delete-subject/modal-delete-subject.component';

@Component({
  selector: 'app-class-study-detail',
  templateUrl: './class-study-detail.component.html',
  styleUrls: ['./class-study-detail.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    NoDataComponent,
    NgFor,
    FormatTimePipe,
    NgIf,
    ButtonComponent
  ]
})
export class ClassStudyDetailComponent implements OnInit {
  iconSvg = iconSVG;
  classId: any;
  dataDetail: any;
  constructor(
    private route: ActivatedRoute,
    private globalStore: GlobalStore,
    private classStudyService: ClassStudyService,
    private showMessageService: ShowMessageService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      this.getListStudentClassDetail();
    });
  }

  getListStudentClassDetail(){
    this.globalStore.isLoading = true;
    let dataRequest = {
      class_id: this.classId,
    }
    this.classStudyService.getListDetailAClass(dataRequest).subscribe((res: any) => {
      this.dataDetail = res.data;
      console.log(res);
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  // onOpenModalAssignSubject(){
  //   console.log(1111111);
  // }

  onOpenModalAssignSubject() {
    const modalRef = this.modalService.open(ModalAssignSubjectComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'sm', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Thêm môn học vào lớp',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        classId: this.classId,
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.addNewSubject(dataInput),
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListStudentClassDetail()
        }
      },
      (reason) => { }
    );
  }

  onOpenModalUpdateAssignSubject(item: any) {
    const modalRef = this.modalService.open(ModalAssignSubjectComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'sm', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'Chỉnh môn học trong lớp',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        classId: this.classId,
        data: item,
        service: this.classStudyService,
        apiSubmit: (dataInput: any) => this.classStudyService.updateSubject(dataInput),
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getListStudentClassDetail()
        }
      },
      (reason) => { }
    );
  }

  removeSubject(id: any){
      const modalRef = this.modalService.open(ModalDeleteSubjectComponent, {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
      });
  
      let data = {
        titleModal: 'Xóa môn học khỏi lớp',
        btnCancel: 'Hủy',
        btnAccept: 'Lưu',
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
              class_id: this.classId,
              class_subject_id: id
            }
            this.classStudyService.removeSubjectClass(dataRequest).subscribe((res) => {
              this.showMessageService.success("Xóa môn học khỏi lớp thành công");
              this.getListStudentClassDetail();
            }, (err) => {
              this.globalStore.isLoading = false
              this.showMessageService.error(err)
            })
          }
        },
        (reason) => { }
      );
    }

    onChangeTimetable(): void{
      this.router.navigateByUrl(`staff/class-study/timetable/${this.classId}`)
    }
}

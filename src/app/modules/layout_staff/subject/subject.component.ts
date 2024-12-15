import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select2 } from 'src/app/_models/gengeral/select2.model';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { GlobalStore } from 'src/app/_store/global.store';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';

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
 
  constructor(
    private globalStore: GlobalStore,
    private showMessageSerivce: ShowMessageService,
    private subjectService: SubjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListSubject();
  }

  onChangeAssignPage(): void{
    this.router.navigateByUrl('staff/subject/assign');
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

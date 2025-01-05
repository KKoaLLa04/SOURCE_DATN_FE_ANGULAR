import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { StatusClassStudentDirective } from 'src/app/_shared/directive/status-class-student.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';
import { StudentService } from '../../layout_staff/services/student.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    InputComponent,
    FormatTimePipe,
    ButtonComponent,
    NgFor,
    StatusClassStudentDirective,
    NgIf,
    RouterLink
  ]
})
export class ProfileComponent implements OnInit {
  iconSvg = iconSVG
  studentId: any;
  dataDetail: any;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private showMessageService: ShowMessageService,
  ) { }

  ngOnInit() {
    let dataUser = localStorage.getItem("UserInfo");
    this.dataDetail = JSON.parse(dataUser);
    console.log(this.dataDetail)
  }
}

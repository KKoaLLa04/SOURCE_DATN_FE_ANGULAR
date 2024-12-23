import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { StatusClassStudentDirective } from 'src/app/_shared/directive/status-class-student.directive';
import { iconSVG } from 'src/app/_shared/enums/icon-svg.enum';
import { FormatTimePipe } from 'src/app/_shared/pipe/format-time.pipe';

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
  studentInformation: any; 
  constructor(
  ) { }

  ngOnInit() {
    let dataUser = localStorage.getItem("UserInfo");
    let dataUserJsonParse = JSON.parse(dataUser)
    this.dataDetail = JSON.parse(dataUser);
    dataUserJsonParse.students.map((item: any) => {
      if(item.id == localStorage.getItem("child_id")){
        this.studentInformation = item;
      }
    })
    console.log(this.studentInformation)
  }
}

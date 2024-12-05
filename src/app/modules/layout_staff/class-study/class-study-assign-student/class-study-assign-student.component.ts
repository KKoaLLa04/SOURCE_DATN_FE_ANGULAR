import { Component, OnInit } from '@angular/core';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { CheckboxComponent } from 'src/app/_shared/components/checkbox/checkbox.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';

@Component({
  selector: 'app-class-study-assign-student',
  templateUrl: './class-study-assign-student.component.html',
  styleUrls: ['./class-study-assign-student.component.scss'],
  standalone: true,
  imports: [
    ButtonBackComponent,
    SelectComponent,
    InputSearchComponent,
    CheckboxComponent
  ]
})
export class ClassStudyAssignStudentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

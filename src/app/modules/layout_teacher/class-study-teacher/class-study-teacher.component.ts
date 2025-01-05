import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { ContextMenuComponent } from 'src/app/_shared/components/context-menu/context-menu.component';
import { InputSearchComponent } from 'src/app/_shared/components/input-search/input-search.component';
import { NoDataComponent } from 'src/app/_shared/components/no-data/no-data.component';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { SelectComponent } from 'src/app/_shared/components/select/select.component';
import { StatusClassDirective } from 'src/app/_shared/directive/status-class.directive';

@Component({
  selector: 'app-class-study-teacher',
  templateUrl: './class-study-teacher.component.html',
  styleUrls: ['./class-study-teacher.component.scss'],
  standalone: true,
  imports: [
    SelectComponent,
    InputSearchComponent,
    ButtonComponent,
    NgFor,
    ContextMenuComponent,
    PaginationComponent,
    NoDataComponent,
    NgIf,
    StatusClassDirective
  ]
})
export class ClassStudyTeacherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

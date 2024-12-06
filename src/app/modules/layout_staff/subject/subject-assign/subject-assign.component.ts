import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Radio } from 'src/app/_models/gengeral/radio.model';
import { ButtonBackComponent } from 'src/app/_shared/components/button-back/button-back.component';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { RadioComponent } from 'src/app/_shared/components/radio/radio.component';

@Component({
  selector: 'app-subject-assign',
  templateUrl: './subject-assign.component.html',
  styleUrls: ['./subject-assign.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    NgFor,
    ButtonBackComponent,
    RadioComponent
  ]
})
export class SubjectAssignComponent implements OnInit {
  optionRadio: Radio = {
    label: "6a3",
    value: 1
  }
  constructor() { }

  ngOnInit() {
  }

}

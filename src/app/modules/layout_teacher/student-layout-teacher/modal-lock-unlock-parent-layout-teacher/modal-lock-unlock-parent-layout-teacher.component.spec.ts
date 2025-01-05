/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalLockUnlockParentLayoutTeacherComponent } from './modal-lock-unlock-parent-layout-teacher.component';

describe('ModalLockUnlockParentLayoutTeacherComponent', () => {
  let component: ModalLockUnlockParentLayoutTeacherComponent;
  let fixture: ComponentFixture<ModalLockUnlockParentLayoutTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLockUnlockParentLayoutTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLockUnlockParentLayoutTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

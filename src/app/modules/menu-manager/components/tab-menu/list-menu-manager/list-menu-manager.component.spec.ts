/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListMenuManagerComponent } from './list-menu-manager.component';

describe('ListMenuManagerComponent', () => {
  let component: ListMenuManagerComponent;
  let fixture: ComponentFixture<ListMenuManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ListMenuManagerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMenuManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

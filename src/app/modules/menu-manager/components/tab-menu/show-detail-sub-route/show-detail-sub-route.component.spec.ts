/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowDetailSubRouteComponent } from './show-detail-sub-route.component';

describe('ShowDetailSubRouteComponent', () => {
  let component: ShowDetailSubRouteComponent;
  let fixture: ComponentFixture<ShowDetailSubRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ShowDetailSubRouteComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailSubRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersadminComponent } from './usersadmin.component';

describe('UsersadminComponent', () => {
  let component: UsersadminComponent;
  let fixture: ComponentFixture<UsersadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

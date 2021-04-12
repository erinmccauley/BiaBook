/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BiabookComponent } from './biabook.component';

describe('BiabookComponent', () => {
  let component: BiabookComponent;
  let fixture: ComponentFixture<BiabookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiabookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiabookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

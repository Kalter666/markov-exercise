import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormValComponent } from './dynamic-form-val.component';

describe('DynamicFormValComponent', () => {
  let component: DynamicFormValComponent;
  let fixture: ComponentFixture<DynamicFormValComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormValComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

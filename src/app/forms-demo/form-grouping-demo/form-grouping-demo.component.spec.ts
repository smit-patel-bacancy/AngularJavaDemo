import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupingDemoComponent } from './form-grouping-demo.component';

describe('FormGroupingDemoComponent', () => {
  let component: FormGroupingDemoComponent;
  let fixture: ComponentFixture<FormGroupingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupingDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationDemoComponent } from './form-validation-demo.component';

describe('FormValidationDemoComponent', () => {
  let component: FormValidationDemoComponent;
  let fixture: ComponentFixture<FormValidationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormValidationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValidationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

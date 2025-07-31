import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsDemoComponent } from './form-controls-demo.component';

describe('FormControlsDemoComponent', () => {
  let component: FormControlsDemoComponent;
  let fixture: ComponentFixture<FormControlsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormControlsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

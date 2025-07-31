import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassingParametersComponent } from './passing-parameters.component';

describe('PassingParametersComponent', () => {
  let component: PassingParametersComponent;
  let fixture: ComponentFixture<PassingParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassingParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassingParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

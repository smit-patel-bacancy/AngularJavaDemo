import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterizedCustomPipeComponent } from './parameterized-custom-pipe.component';

describe('ParameterizedCustomPipeComponent', () => {
  let component: ParameterizedCustomPipeComponent;
  let fixture: ComponentFixture<ParameterizedCustomPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterizedCustomPipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterizedCustomPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

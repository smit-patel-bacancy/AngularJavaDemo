import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterizedPipesComponent } from './parameterized-pipes.component';

describe('ParameterizedPipesComponent', () => {
  let component: ParameterizedPipesComponent;
  let fixture: ComponentFixture<ParameterizedPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterizedPipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterizedPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionPipesComponent } from './introduction-pipes.component';

describe('IntroductionPipesComponent', () => {
  let component: IntroductionPipesComponent;
  let fixture: ComponentFixture<IntroductionPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductionPipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

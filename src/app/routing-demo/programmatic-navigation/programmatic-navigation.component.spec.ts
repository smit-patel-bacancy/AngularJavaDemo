import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammaticNavigationComponent } from './programmatic-navigation.component';

describe('ProgrammaticNavigationComponent', () => {
  let component: ProgrammaticNavigationComponent;
  let fixture: ComponentFixture<ProgrammaticNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammaticNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammaticNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

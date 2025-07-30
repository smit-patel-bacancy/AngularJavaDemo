import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsDeepDiveComponent } from './components-deep-dive.component';

describe('ComponentsDeepDiveComponent', () => {
  let component: ComponentsDeepDiveComponent;
  let fixture: ComponentFixture<ComponentsDeepDiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsDeepDiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsDeepDiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

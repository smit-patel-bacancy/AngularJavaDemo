import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesSignalsDemoComponent } from './observables-signals-demo.component';

describe('ObservablesSignalsDemoComponent', () => {
  let component: ObservablesSignalsDemoComponent;
  let fixture: ComponentFixture<ObservablesSignalsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesSignalsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservablesSignalsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

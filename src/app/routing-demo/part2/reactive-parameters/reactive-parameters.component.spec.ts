import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveParametersComponent } from './reactive-parameters.component';

describe('ReactiveParametersComponent', () => {
  let component: ReactiveParametersComponent;
  let fixture: ComponentFixture<ReactiveParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

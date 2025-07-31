import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPipeDemoComponent } from './custom-pipe-demo.component';

describe('CustomPipeDemoComponent', () => {
  let component: CustomPipeDemoComponent;
  let fixture: ComponentFixture<CustomPipeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPipeDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPipeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDemoComponent } from './routing-demo.component';

describe('RoutingDemoComponent', () => {
  let component: RoutingDemoComponent;
  let fixture: ComponentFixture<RoutingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

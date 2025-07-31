import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyRouterComponent } from './why-router.component';

describe('WhyRouterComponent', () => {
  let component: WhyRouterComponent;
  let fixture: ComponentFixture<WhyRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

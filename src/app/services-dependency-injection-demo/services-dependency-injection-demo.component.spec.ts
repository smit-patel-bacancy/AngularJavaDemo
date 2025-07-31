import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDependencyInjectionDemoComponent } from './services-dependency-injection-demo.component';

describe('ServicesDependencyInjectionDemoComponent', () => {
  let component: ServicesDependencyInjectionDemoComponent;
  let fixture: ComponentFixture<ServicesDependencyInjectionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesDependencyInjectionDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesDependencyInjectionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

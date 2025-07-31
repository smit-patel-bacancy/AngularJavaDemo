import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipeDemoComponent } from './async-pipe-demo.component';

describe('AsyncPipeDemoComponent', () => {
  let component: AsyncPipeDemoComponent;
  let fixture: ComponentFixture<AsyncPipeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncPipeDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncPipeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

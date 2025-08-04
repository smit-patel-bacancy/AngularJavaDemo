import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleParentChildDemoComponent } from './simple-parent-child-demo.component';

describe('SimpleParentChildDemoComponent', () => {
  let component: SimpleParentChildDemoComponent;
  let fixture: ComponentFixture<SimpleParentChildDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleParentChildDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleParentChildDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

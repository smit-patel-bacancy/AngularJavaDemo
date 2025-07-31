import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildCommunicationDemoComponent } from './parent-child-communication-demo.component';

describe('ParentChildCommunicationDemoComponent', () => {
  let component: ParentChildCommunicationDemoComponent;
  let fixture: ComponentFixture<ParentChildCommunicationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentChildCommunicationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentChildCommunicationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

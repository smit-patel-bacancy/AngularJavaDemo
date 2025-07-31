import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationChildComponent } from './communication-child.component';

describe('CommunicationChildComponent', () => {
  let component: CommunicationChildComponent;
  let fixture: ComponentFixture<CommunicationChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

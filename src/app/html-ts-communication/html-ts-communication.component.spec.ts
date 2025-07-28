import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTsCommunicationComponent } from './html-ts-communication.component';

describe('HtmlTsCommunicationComponent', () => {
  let component: HtmlTsCommunicationComponent;
  let fixture: ComponentFixture<HtmlTsCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlTsCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlTsCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

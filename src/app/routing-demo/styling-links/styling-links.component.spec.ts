import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingLinksComponent } from './styling-links.component';

describe('StylingLinksComponent', () => {
  let component: StylingLinksComponent;
  let fixture: ComponentFixture<StylingLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylingLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylingLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

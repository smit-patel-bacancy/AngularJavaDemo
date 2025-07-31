import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectsWildcardsComponent } from './redirects-wildcards.component';

describe('RedirectsWildcardsComponent', () => {
  let component: RedirectsWildcardsComponent;
  let fixture: ComponentFixture<RedirectsWildcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectsWildcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectsWildcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

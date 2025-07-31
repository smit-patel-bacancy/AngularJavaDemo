import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathMatchingComponent } from './path-matching.component';

describe('PathMatchingComponent', () => {
  let component: PathMatchingComponent;
  let fixture: ComponentFixture<PathMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathMatchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

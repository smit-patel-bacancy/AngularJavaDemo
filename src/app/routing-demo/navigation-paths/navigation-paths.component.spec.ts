import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPathsComponent } from './navigation-paths.component';

describe('NavigationPathsComponent', () => {
  let component: NavigationPathsComponent;
  let fixture: ComponentFixture<NavigationPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationPathsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

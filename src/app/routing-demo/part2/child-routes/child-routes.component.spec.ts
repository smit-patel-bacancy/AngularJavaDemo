import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRoutesComponent } from './child-routes.component';

describe('ChildRoutesComponent', () => {
  let component: ChildRoutesComponent;
  let fixture: ComponentFixture<ChildRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

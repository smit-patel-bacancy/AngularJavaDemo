import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRoutesComponent } from './setup-routes.component';

describe('SetupRoutesComponent', () => {
  let component: SetupRoutesComponent;
  let fixture: ComponentFixture<SetupRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParamsFragmentsComponent } from './query-params-fragments.component';

describe('QueryParamsFragmentsComponent', () => {
  let component: QueryParamsFragmentsComponent;
  let fixture: ComponentFixture<QueryParamsFragmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryParamsFragmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryParamsFragmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

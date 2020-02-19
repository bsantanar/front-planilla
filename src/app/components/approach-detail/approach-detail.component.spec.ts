import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproachDetailComponent } from './approach-detail.component';

describe('ApproachDetailComponent', () => {
  let component: ApproachDetailComponent;
  let fixture: ComponentFixture<ApproachDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproachDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproachDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

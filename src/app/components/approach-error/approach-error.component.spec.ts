import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproachErrorComponent } from './approach-error.component';

describe('ApproachErrorComponent', () => {
  let component: ApproachErrorComponent;
  let fixture: ComponentFixture<ApproachErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproachErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproachErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

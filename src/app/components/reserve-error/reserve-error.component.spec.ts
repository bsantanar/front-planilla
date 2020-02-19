import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveErrorComponent } from './reserve-error.component';

describe('ReserveErrorComponent', () => {
  let component: ReserveErrorComponent;
  let fixture: ComponentFixture<ReserveErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTableComponent } from './alert-table.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Alert } from 'src/app/classes/alert';

const dummyAlert: Alert[] = [];

fdescribe('AlertTableComponent', () => {
  let component: AlertTableComponent;
  let fixture: ComponentFixture<AlertTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTableComponent ],
      imports: [MatPaginatorModule, MatTableModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTableComponent);
    component = fixture.componentInstance;
    component.dataSource = dummyAlert;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

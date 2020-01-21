import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, MatInputModule, MatOptionModule, MatSelect, MatSelectModule, MatTableModule, MatIconModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

import { TripTableComponent } from './trip-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Trip } from 'src/app/classes/trip';


const dummyTrip: Trip[] = [{
  "patent": "LKTD11",
  "carrier": "TRANSPORTES LUIS HENRIQUEZ",
  "date": new Date(2019, 10, 10),
  "reservationDetail": [
    {
      "store": "CO Vina del Mar",
      "officeStore": "CO Vina del Mar",
      "locationOrigin": "VIÑA DEL MAR",
      "locationDestination": "VALPARAISO",
      "roadNumber": 888334.0,
      "guideNumber": "55799432",
      "reservationNumber": "212185486",
      "sector": "Urbano 2",
      "weight": 1800.0,
      "distance": "7.8462611100491575",
      "dataOrigin": "DADI",
      "modality": "DADI",
      "dealFK": 192521,
      "obs": " carrie_FK:8059528 mdlity_FK:2 trcktp_FK:1 route_FK:54174 routtp_FK:2 caprng_FK:6 || Distance:7.8462611100491575 Weigth: 1800.0",
      "tariff": 26214.0
    }
  ],
  "reservationDetailError": [],
  "locationAproach": [],
  "locationApproachError": [],
  "totalTariff": 10000,
  "percentage": 80
}];

fdescribe('TripTableComponent', () => {
  let component: TripTableComponent;
  let fixture: ComponentFixture<TripTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTableComponent ],
      imports: [ MatInputModule, MatOptionModule, MatSelectModule, 
        MatTableModule, MatIconModule, MatPaginatorModule, 
        MatDialogModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTableComponent);
    component = fixture.componentInstance;
    component.dataSource = dummyTrip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get index 0', () => {
    component.setFirstPage();
    expect(component.paginator.pageIndex).toBe(0);
  });

  it('should get one item', () => {
    component.carrierSelected("TRANSPORTES LUIS HENRIQUEZ");
    expect(component.showElements.data.length).toBe(1);
  });
});

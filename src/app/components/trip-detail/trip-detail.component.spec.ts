import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailComponent } from './trip-detail.component';
import { MatGridListModule, MatDatepickerModule, MatCardModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Trip } from 'src/app/classes/trip';

const dummyTrip: Trip = {
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
    };

fdescribe('TripDetailComponent', () => {
  let component: TripDetailComponent;
  let fixture: ComponentFixture<TripDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDetailComponent ],
      imports: [MatGridListModule, MatDatepickerModule, MatCardModule, MatDialogModule],
      providers: [{provide: MatDialogRef}, {provide: MAT_DIALOG_DATA, useValue: dummyTrip}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtain correctly dummy trip', () => {
    expect(component.patent).toEqual(dummyTrip.patent);
  });

});

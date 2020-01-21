import { async, ComponentFixture, TestBed, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { MatDatepickerModule, MatInputModule, MatRadioModule, MatTableModule, MatOptionModule, MatSelectModule, MatIconModule, MatPaginatorModule, MAT_DATE_LOCALE, MatPaginatorIntl, DateAdapter, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TripTableComponent } from '../trip-table/trip-table.component';
import { AlertTableComponent } from '../alert-table/alert-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { getSpanishPaginatorIntl } from 'src/app/locale/spanish-paginator-intl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripService } from 'src/app/services/trip.service';
import { Observable, of, throwError } from 'rxjs';
import { Trip } from 'src/app/classes/trip';


const dummyTrip: any[] = [{
  trip: {
    tripDTOS: [{
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
    }],
    tripError: []
  }
}];

fdescribe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let tripService = jasmine.createSpyObj('TripService', ['getTripsByDate']);
  let getTripsSpy = tripService.getTripsByDate.and.returnValue( of(dummyTrip) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListComponent, TripTableComponent, AlertTableComponent ],
      imports: [MatDatepickerModule, MatInputModule, ReactiveFormsModule, FormsModule, MatRadioModule, 
        MatTableModule, MatOptionModule, MatSelectModule, MatIconModule, MatPaginatorModule, 
        MatNativeDateModule, BrowserAnimationsModule, HttpClientModule],
      providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-419'},
      { provide: TripService, useValue: tripService },
      {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept dummy trip', () => {
    component.startDate = new Date(2019, 9, 1);
    component.endDate = new Date(2019, 9, 1);
    component.searchReservationsByDate();

    expect(component.tripsList.length).toBeGreaterThan(0);

  });

  it('should get error', fakeAsync(() => {
    getTripsSpy = tripService.getTripsByDate.and.returnValue(throwError('TripService failed'));
    
    fixture.detectChanges();
    component.startDate = new Date(2019, 9, 1);
    component.endDate = new Date(2019, 9, 1);

    component.searchReservationsByDate();

    tick();

    fixture.detectChanges();

    expect(component.loading).toBe(false);


  }));

  it('should modify percentage of a trip', () => {
    component.tripsList = dummyTrip[0].trip.tripDTOS;
    component.calculatePercentagePaid();
    expect(component.tripsList[0].percentage).toBeGreaterThan(0);
  });

  it('should calculate tariff of a reservation', () => {
    component.tripsList = dummyTrip[0].trip.tripDTOS;
    component.calculateTotalTariff();
    expect(component.tripsList[0].totalTariff).toBeGreaterThan(0);
  });

});
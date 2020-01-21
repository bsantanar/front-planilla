import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { AlertComponent } from './components/alert/alert.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripTableComponent } from './components/trip-table/trip-table.component';
import { AlertTableComponent } from './components/alert-table/alert-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatExpansionModule, MatPaginatorModule, 
  MatSortModule, MatSelectModule, MatRadioModule, MatIconModule, 
  MatInputModule, MatButtonModule, MatDialogModule, MatDatepickerModule, 
  MatNativeDateModule, MatCardModule, MatGridListModule, MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from './locale/spanish-paginator-intl';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  { path: 'trip-list', component: TripListComponent },
  { path: 'alert-list', component: AlertComponent },
  {path: '**', redirectTo: '/trip-list', pathMatch: 'full'}
];


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        TripListComponent,
        AlertComponent,
        TripDetailComponent,
        TripTableComponent,
        AlertTableComponent
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        ReactiveFormsModule, HttpClientModule, FormsModule, BrowserAnimationsModule,
        MatTableModule, MatExpansionModule, MatPaginatorModule, MatSortModule, MatSelectModule,
        MatIconModule, MatButtonModule, MatDialogModule, MatCardModule, MatGridListModule,
        MatRadioModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
      ],
      providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-419'},
        //{provide: DateAdapter,},
        {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()}, {provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trips-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('trips-app');
  });
});

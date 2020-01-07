import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatExpansionModule, MatPaginatorModule, 
  MatSortModule, MatSelectModule, MatIconModule, MatButtonModule, 
  MatDialogModule, MatCardModule, MatGridListModule, MatRadioModule, 
  MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MAT_DATE_LOCALE, MatPaginatorIntl} from '@angular/material';
import { AlertComponent } from './components/alert/alert.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripTableComponent } from './components/trip-table/trip-table.component';
import { AlertTableComponent } from './components/alert-table/alert-table.component';
import { getSpanishPaginatorIntl } from './locale/spanish-paginator-intl';



const appRoutes: Routes = [
  { path: 'trip-list', component: TripListComponent },
  { path: 'alert-list', component: AlertComponent },
  {path: '**', redirectTo: '/trip-list', pathMatch: 'full'}
];

@NgModule({
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
  entryComponents: [
    TripDetailComponent
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-CL'},
    {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()}],
  bootstrap: [AppComponent]
})
export class AppModule { }

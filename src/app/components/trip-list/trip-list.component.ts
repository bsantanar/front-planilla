import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Trip } from 'src/app/classes/trip';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';
import { CarrierService } from 'src/app/services/carrier.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  inputDate: Date;
  inputTypeTrips: number;
  loading:boolean = false;
  tripsList: Trip[] = [];
  alertsList: any[] = [];
  showTrips: any[] = [];
  displayedColumns: string[] = ['patent', 'carrier', 'total', 'detail'];
  displayedColumnsAlert: string[] = ['patent', 'carrier', 'method', 'description'];
  carriers: string[] = [];
  carriersAlerts: string[] = [];
  dataSource;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private tripSevice: TripService, public dialog: MatDialog, 
    private carrierService: CarrierService) { }

  ngOnInit() {
  }

  parseDate(date: Date){
    let month = '' + (date.getMonth() + 1), 
        day = '' + (date.getDate()),
        year = '' + (date.getFullYear());
    if(month.length < 2) month = '0' + month;
    if(day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  searchReservationsByDate(){
    let date = this.inputDate.toString();
    //let parsedDate = this.parseDate(this.inputDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(date).subscribe(
      res => {
        this.tripsList = this.showTrips = res['homologationDTOS'];
        this.alertsList = res['errorDTOS'];
        //console.log(res, this.tripsList);
        //this.dataSource = new MatTableDataSource(this.showTrips);
        //this.dataSource.sort = this.sort;
        this.loading = false;
        this.calculateTotalTariff();
      }, err => {
        console.log(err);
      }
    );
  }

  calculateTotalTariff(){
    this.carriers = [];
    this.carriersAlerts = [];
    for (const trip of this.tripsList) {
      let total = 0;
      for (const detail of trip.detail) {
        total += detail.tariff;
      }
      trip.totalTariff = total;
      if(this.carriers.indexOf(trip.carrier) === -1) {
        this.carriers.push(trip.carrier);
      }
    }
    for (const alert of this.alertsList) {
      if(this.carriersAlerts.indexOf(alert.carrier) === -1){
        this.carriersAlerts.push(alert.carrier);
      }
    }
    this.tripsList.sort((a, b) => {return b.totalTariff - a.totalTariff});
    // this.tripsList.sort(tota);
  }

  carrierSelected(carrier){
    if(this.inputTypeTrips == 1){
      this.showTrips = this.tripsList.filter((trip) => { if(trip.carrier === carrier) return trip }); 
    } else {
      this.showTrips = this.alertsList.filter((alert) => { if(alert.carrier === carrier) return alert }); 
    }
  }

  typeListSelected(value: number){
    if(value === 2) {
      this.inputTypeTrips = 2;
      this.showTrips = this.alertsList
    }
    else {
      this.inputTypeTrips = 1;
      this.showTrips = this.tripsList;
    }
  }

  detailTrip(trip: Trip): void {
    const dialogRef = this.dialog.open(TripDetailComponent, {
      width: '65%',
      height: '80%',
      data: trip,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  test(){
    const dialogRef = this.dialog.open(TripDetailComponent, {
      width: '65%',
      height: '80%',
      data: 1,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('close');
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { Trip } from 'src/app/classes/trip';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';
import { CarrierService } from 'src/app/services/carrier.service';
import { Carrier } from 'src/app/classes/carrier';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  inputDate: Date;
  inputTypeTrips: number;
  percentage: number;
  loading:boolean = false;
  tripsList: Trip[] = [];
  alertsList: any[] = [];
  showTrips: any[] = [];
  displayedColumns: string[] = ['patent', 'carrier', 'completed', 'total', 'detail'];
  displayedColumnsAlert: string[] = ['patent', 'carrier', 'method', 'description'];
  carriers: any[] = [];
  carriersAlerts: any[] = [];
  dataSource = new MatTableDataSource([]);

  //@ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private tripSevice: TripService, public dialog: MatDialog, 
    private carrierService: CarrierService, private utils: UtilsService) {}

  ngOnInit() {
  }

  searchReservationsByDate(){
    let date = this.utils.parseDate(this.inputDate);
    //let parsedDate = this.parseDate(this.inputDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(date).subscribe(
      res => {
        this.tripsList = this.showTrips = res['homologationDTOS'];
        this.alertsList = res['errorDTOS'];
        //console.log(res);
        //console.log(res, this.tripsList);
        //this.dataSource = new MatTableDataSource(this.showTrips);
        this.dataSource.data = this.tripsList;
        this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.loading = false;
        this.calculateTotalTariff();
        this.calculatePercentagePaid();
      }, err => {
        console.log(err);
      }
    );
  }

  calculatePercentagePaid(){
    for (const trip of this.tripsList) {
      let acum = 0, completed = 0;
      for (const detail of trip.detail) {
        acum += 1;
        completed += 1;
      }
      for (const alert of this.alertsList) {
        if(alert.patent == trip.patent){
          acum += 1;
        }
      }
      trip.percentage = Math.round(completed * 100 / acum);
    }
  }

  calculateTotalTariff(){
    this.carriers = [];
    this.carriersAlerts = [];
    for (const trip of this.tripsList) {
      let total = 0;
      for (const detail of trip.detail) {
        total += detail.tariff;
        detail.weight = parseFloat(detail.weight.toFixed(2));
      }
      trip.totalTariff = total;
      if(this.carriers.indexOf(trip.carrier === -1)){
        this.carriers.push(trip.carrier);
      }
      //this.loadCarrierObject(trip.carrier, this.tripsList.indexOf(trip), 1);
    }
    for (const alert of this.alertsList) {
      if(this.carriersAlerts.indexOf(alert.carrier) === -1){
        this.carriersAlerts.push(alert.carrier);
      }
    }
    this.loadAlertCarrierObject();
    this.tripsList.sort((a, b) => {return b.totalTariff - a.totalTariff});
    // this.tripsList.sort(tota);
  }

  loadAlertCarrierObject(){
    for (let i = 0; i < this.carriersAlerts.length; i++) {
      this.carrierService.getCarrierById(this.carriersAlerts[i]).subscribe(
        res => {
          //console.log(res);
            // this.alertsList[index].carrier = res;
            this.carriersAlerts[i] = res;
            for (const alert of this.alertsList) {
              if(alert.carrier == res['carriePk']){
                alert.carrier = res['carrieName']
              }
            }
        }, err => {
          return err;
        }
      );
    }
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

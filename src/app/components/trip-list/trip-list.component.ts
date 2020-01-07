import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { Trip } from 'src/app/classes/trip';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';
import { CarrierService } from 'src/app/services/carrier.service';
import { Carrier } from 'src/app/classes/carrier';
import { UtilsService } from 'src/app/services/utils.service';
import { Alert } from 'src/app/classes/alert';

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
  emptySearch: boolean = false;
  tripsList: Trip[] = [];
  alertsList: Alert[] = [];
  carriers: any[] = [];
  carriersAlerts: any[] = [];

  constructor(private tripSevice: TripService, 
    private carrierService: CarrierService, private utils: UtilsService) {}

  ngOnInit() {
  }

  searchReservationsByDate(){
    this.tripsList = this.alertsList = [];
    this.inputTypeTrips = 0;
    this.emptySearch = false;
    let date = this.utils.parseDate(this.inputDate);
    //let parsedDate = this.parseDate(this.inputDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(date).subscribe(
      res => {
        this.tripsList = (res as any).tripDTOS;
        this.alertsList = (res as any).patentError;
        if(this.tripsList.length == 0 && this.alertsList.length == 0) this.emptySearch = true;
        console.log(res);
        //console.log(this.tripsList);
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
      for (const detail of trip.reservationDetail) {
        acum += 1;
        completed += 1;
      }
      for (const alert of this.alertsList) {
        if(alert.patent == trip.patent){
          acum += 1;
        }
      }
      for(const err of trip.reservationDetailError){
        acum +=1;
      }
      trip.percentage = Math.round(completed * 100 / acum);
    }
  }

  calculateTotalTariff(){
    this.carriers = [];
    this.carriersAlerts = [];
    for (const trip of this.tripsList) {
      let total = 0;
      for (const detail of trip.reservationDetail) {
        total += detail.tariff;
        detail.weight = parseFloat(detail.weight.toFixed(2));
      }
      trip.totalTariff = total;
      if(this.carriers.indexOf(trip.carrier) === -1){
        this.carriers.push(trip.carrier);
      }
      //this.loadCarrierObject(trip.carrier, this.tripsList.indexOf(trip), 1);
    }
    this.tripsList.sort((a, b) => {return b.totalTariff - a.totalTariff});
    // this.tripsList.sort(tota);
  }

  typeListSelected(value: number){
    if(value === 2) {
      this.inputTypeTrips = 2;
    }
    else {
      this.inputTypeTrips = 1;
    }
  }


}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/domain/trip';
import { CarrierService } from 'src/app/services/carrier.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Alert } from 'src/app/domain/alert';
import { FormControl } from '@angular/forms';
import { TripRange } from 'src/app/domain/trip-range';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  startDate: Date = new Date(2020, 2, 6);
  endDate: Date = new Date(2020, 2, 6);
  date: FormControl = new FormControl();
  maxDate = new Date();
  minDate = new Date(2018, 0, 1);
  inputTypeTrips: number;
  percentage: number;
  loading:boolean = false;
  emptySearch: boolean = false;
  tripsList: Trip[] = [];
  alertsList: Alert[] = [];
  tripsByDates: TripRange[] = [];
  carriers: any[] = [];
  carriersAlerts: any[] = [];

  constructor(private tripSevice: TripService, 
    private carrierService: CarrierService, private utils: UtilsService) {}

  ngOnInit() {
  }

  searchReservationsByDate(){
    this.tripsList = [];
    this.alertsList = [];
    this.tripsByDates = [];
    this.inputTypeTrips = 0;
    this.emptySearch = false;
    //console.log(this.date.value);
    let startDateString = this.utils.parseDate(this.startDate);
    let endDateString = this.utils.parseDate(this.endDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(startDateString, endDateString).subscribe(
      res => {
        //console.log(res);
        for (const resp of (res as any)) {
          if(resp.tripDTOS){
            for (const trip of resp.tripDTOS) {
              this.tripsList.push(trip);
            }
          }
          if(resp.tripError){
            for (const trip of resp.tripError) {
              this.alertsList.push(trip);
            }
          }
          //this.tripsList.push(resp.trip.tripDTOS);
          //this.alertsList.push(resp.trip.tripError);
        }
        // this.tripsList = (res as any).response[0].trip.tripDTOS;
        // this.alertsList = (res as any).response[0].trip.tripError;
        if(this.tripsList.length == 0 && this.alertsList.length == 0) this.emptySearch = true;
        //console.log(res);
        //console.log(this.tripsList);
        this.loading = false;
        this.calculateTotalTariff();
        this.inputTypeTrips = 1;
        this.joinTripsByPatent();
        this.calculatePercentagePaid();
        //return res;
      }, err => {
        this.loading = false;
        //console.log(err);
      }
    );
  }

  joinTripsByPatent(){
    let readyPatents = [];
    for (const trip of this.tripsList) {
      if(readyPatents.indexOf(trip.patent) === -1){
        readyPatents.push(trip.patent);
        let tripByDate: TripRange = {
          trips: [],
          patent: trip.patent,
          totalTariff: 0,
          carrier: trip.carrier,
          percentage: 0
        };
        tripByDate.trips = this.tripsList.filter(a => a.patent == trip.patent);
        for (const trip of tripByDate.trips) {
          tripByDate.totalTariff += trip.totalVal;
        }
        this.tripsByDates.push(tripByDate);
      }
    }
  }

  calculatePercentagePaid(){
    for (const tripByDate of this.tripsByDates) {
      let acum = 0, completed = 0;
      for (const trip of tripByDate.trips) {
        for (const detail of trip.reservationDetail) {
          acum += 1;
          completed += 1;
        }
        // for (const alert of this.alertsList) {
        //   if(alert.patent == trip.patent){
        //     acum += 1;
        //   }
        // }
        for(const err of trip.reservationDetailError){
          acum +=1;
        }
      }
      if(acum === 0){
        tripByDate.percentage = 0;
      } else {
        tripByDate.percentage = Math.round(completed * 100 / acum);
      }
    }
  }

  calculateTotalTariff(){
    this.carriers = [];
    this.carriersAlerts = [];
    for (const trip of this.tripsList) {
      //let total = 0;
      for (const detail of trip.reservationDetail) {
        detail.date = trip.date;
        //total += detail.tariff;
        detail.weight = parseFloat(detail.weight.toFixed(2));
      }
      //trip.totalVal = total;
      if(this.carriers.indexOf(trip.carrier) === -1){
        //console.log(this.carriers);
        this.carriers.push(trip.carrier);
      }
      //this.loadCarrierObject(trip.carrier, this.tripsList.indexOf(trip), 1);
    }
    this.tripsList.sort((a, b) => {return b.totalVal - a.totalVal});
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
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  startDate: Date;
  loading:boolean = false;
  alertList: any[] = [];
  displayedColumns: string[] = ['patent', 'carrier', 'method', 'description'];

  constructor(private tripSevice: TripService) { }

  ngOnInit() {
  }

  searchAlertsByDate(){
    let date = this.startDate.toString();
    //let parsedDate = this.parseDate(this.inputDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(date, date).subscribe(
      res => {
        this.alertList = res['errorDTOS'];
        console.log(res, this.alertList);
        this.loading = false;
      }, err => {
        console.log(err);
      }
    );
  }

}

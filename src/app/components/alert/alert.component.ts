import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  inputDate: Date;
  loading:boolean = false;
  alertList: any[] = [];
  displayedColumns: string[] = ['patent', 'carrier', 'method', 'description'];

  constructor(private tripSevice: TripService) { }

  ngOnInit() {
  }

  searchAlertsByDate(){
    let date = this.inputDate.toString();
    //let parsedDate = this.parseDate(this.inputDate);
    this.loading = true;
    this.tripSevice.getTripsByDate(date).subscribe(
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

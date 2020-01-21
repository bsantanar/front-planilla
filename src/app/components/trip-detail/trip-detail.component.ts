import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';
import { Alert } from 'src/app/classes/alert';
import { Reservation } from 'src/app/classes/reservation';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  listDetailError: Alert[] = [];
  listDetail: Reservation[] = [];
  patent: string = "";

  constructor(public dialogRef: MatDialogRef<TripDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private utils: UtilsService) { }

  ngOnInit() {
    if(this.data){
      this.listDetailError = this.data.reservationDetailError;
      this.listDetail = this.data.reservationDetail;
      this.patent = this.data.patent;
      for (const detail of this.data.reservationDetail) {
        if(detail.locationOrigin){
          detail.locationOrigin = detail.locationOrigin.toLowerCase();
          detail.locationOrigin = detail.locationOrigin[0].toUpperCase() + detail.locationOrigin.slice(1);
          detail.locationDestination = detail.locationDestination.toLowerCase();
          detail.locationDestination = detail.locationDestination[0].toUpperCase() + detail.locationDestination.slice(1);
        }
      }
    }
    //this.data = this.test;
    //console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

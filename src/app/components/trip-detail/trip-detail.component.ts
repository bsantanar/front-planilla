import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';
import { Alert } from 'src/app/domain/alert';
import { Reservation } from 'src/app/domain/reservation';
import { ReserveService } from 'src/app/services/reserve.service';
import { TripRange } from 'src/app/domain/trip-range';
import { formatNumber } from '../../utils/utils';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  listDetailError: Alert[] = [];
  listDetail: Reservation[] = [];
  patent: string = "";
  totalTariff: number = 0;

  constructor(public dialogRef: MatDialogRef<TripDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripRange, private utils: UtilsService, 
    private reserveService: ReserveService) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data){
      for (const trip of this.data.trips) {
        trip.reservationDetail.forEach(detail => {
          this.listDetail.push(detail);
        });
        trip.reservationDetailError.forEach(detailError => {
          this.listDetailError.push(detailError);
        });
      }
      this.patent = this.data.patent;
      this.totalTariff = this.data.totalTariff;
    }
    //this.data = this.test;
    //console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TripRange } from 'src/app/domain/trip-range';
import { UtilsService } from 'src/app/services/utils.service';
import { Approach } from 'src/app/domain/approach';

@Component({
  selector: 'app-approach-detail',
  templateUrl: './approach-detail.component.html',
  styleUrls: ['./approach-detail.component.scss']
})
export class ApproachDetailComponent implements OnInit {

  patent: string;
  totalTariff: number;
  approachList: Approach[] = [];
  approachErrorList: Approach[] = [];

  constructor(public dialogRef: MatDialogRef<ApproachDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripRange, private utils: UtilsService) { }

  ngOnInit() {
    if(this.data){
      //console.log(this.data);
      for (const trip of this.data.trips) {
        trip.locationApproach.forEach(approach => {
          if(approach.cost > 1) this.approachList.push(approach);
          else this.approachErrorList.push(approach);
        });
        trip.locationApproachError.forEach(approachError => {
          this.approachErrorList.push(approachError);
        });
      }
      this.totalTariff = this.calculateToralTariff(this.approachList);
      console.log(this.approachList, this.approachErrorList);
      this.patent = this.data.patent;
    }
  }

  calculateToralTariff(approachList: Approach[]): number{
    let total = approachList.reduce((a, b) => { return a + b.cost}, 0);
    return total;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

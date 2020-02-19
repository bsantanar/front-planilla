import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TripRange } from 'src/app/classes/trip-range';
import { UtilsService } from 'src/app/services/utils.service';
import { Approach } from 'src/app/classes/approach';

@Component({
  selector: 'app-approach-detail',
  templateUrl: './approach-detail.component.html',
  styleUrls: ['./approach-detail.component.css']
})
export class ApproachDetailComponent implements OnInit {

  patent: string;
  approachList: Approach[] = [];
  approachErrorList: Approach[] = [];

  constructor(public dialogRef: MatDialogRef<ApproachDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripRange, private utils: UtilsService) { }

  ngOnInit() {
    if(this.data){
      console.log(this.data);
      for (const trip of this.data.trips) {
        trip.locationApproach.forEach(approach => {
          this.approachList.push(approach);
        });
        trip.locationApproachError.forEach(approachError => {
          this.approachErrorList.push(approachError);
        });
      }
      console.log(this.approachList, this.approachErrorList);
      this.patent = this.data.patent;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

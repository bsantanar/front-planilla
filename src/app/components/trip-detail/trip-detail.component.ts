import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  test: any = {
    "patent": "LKTD11",
    "carrier": "3746",
    "date": "2019-12-05",
    "detail":[
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170679",
    "sector": "URBANO 1",
    "weight": 126,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 4363
    },
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170678",
    "sector": "URBANO 2",
    "weight": 145,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 6545
    },
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170680",
    "sector": "URBANO 2",
    "weight": 142,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 6545
    },
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170680",
    "sector": "URBANO 2",
    "weight": 142,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 6545
    },
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170680",
    "sector": "URBANO 2",
    "weight": 142,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 6545
    },
    {
    "store": 3,
    "officeStore": "3.0",
    "roadNumber": 2006720,
    "guideNumber": "56170680",
    "sector": "URBANO 2",
    "weight": 142,
    "distance": "",
    "method": "VENTA EMPRESA",
    "dealFK": null,
    "tariff": 6545
    }
    ],
    "locationAproachList": null
    };

  //constructor(){}

  constructor(public dialogRef: MatDialogRef<TripDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //this.data = this.test;
    //console.log(this.data);
  }

  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

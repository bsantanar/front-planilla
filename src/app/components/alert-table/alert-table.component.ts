import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Carrier } from 'src/app/classes/carrier';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Alert } from 'src/app/classes/alert';

@Component({
  selector: 'app-alert-table',
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.css']
})
export class AlertTableComponent implements OnInit {

  showElements = new MatTableDataSource([]);

  displayedColumnsAlert: string[] = ['patent', 'dataOrigin', 'modality', 'officeStore', 'obs'];

  @Input() dataSource: Alert[];
  @Input() carriers: Carrier[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor() { }

  ngOnInit() {
    this.showElements.data = this.dataSource;
    this.showElements.paginator = this.paginator;
  }

  // carrierSelected(carrier){
  //   this.showElements.data = this.dataSource.filter((alert) => { if(alert.carrier === carrier) return trip }); 
  // }

}

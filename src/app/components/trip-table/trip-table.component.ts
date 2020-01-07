import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Trip } from 'src/app/classes/trip';
import { Carrier } from 'src/app/classes/carrier';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.css']
})
export class TripTableComponent implements OnInit {

  showElements = new MatTableDataSource([]);

  displayedColumns: string[] = ['patent', 'carrier', 'completed', 'total', 'detail'];
  @Input() dataSource: Trip[];
  @Input() carriers: Carrier[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private utils: UtilsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.showElements.data = this.dataSource;
    this.showElements.paginator = this.paginator;
    this.showElements.sort = this.sort;
  }

  detailTrip(trip: Trip): void {
    const dialogRef = this.dialog.open(TripDetailComponent, {
      width: '65%',
      height: '80%',
      data: trip,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  carrierSelected(carrier){
      this.showElements.data = this.dataSource.filter((trip) => { if(trip.carrier === carrier) return trip }); 
  }

}

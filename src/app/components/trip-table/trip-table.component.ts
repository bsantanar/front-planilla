import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Trip } from 'src/app/domain/trip';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';
import { TripRange } from 'src/app/domain/trip-range';
import { Carrier } from 'src/app/domain/carrier';
import { ApproachDetailComponent } from '../approach-detail/approach-detail.component';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.scss']
})
export class TripTableComponent implements OnInit {

  showElements = new MatTableDataSource([]);

  displayedColumns: string[] = ['patent', 'carrier', 'percentage', 'totalTariff', 'detail', 'approach'];
  @Input() dataSource: TripRange[];
  @Input() carriers: Carrier[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private utils: UtilsService, public dialog: MatDialog) { }


  ngOnInit() {
    this.showElements.data = this.dataSource;
    this.showElements.paginator = this.paginator;
    this.showElements.sort = this.sort;
  }

  detailTrip(tripRange: TripRange): void {
    const dialogRef = this.dialog.open(TripDetailComponent, {
      width: '60%',
      height: '70%',
      data: tripRange,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  detailApproach(tripRange: TripRange): void {
    const dialogRef = this.dialog.open(ApproachDetailComponent, {
      width: '60%',
      height: '70%',
      data: tripRange,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  carrierSelected(carrier){
      this.showElements.data = this.dataSource.filter((trips) => { if(trips.carrier === carrier) return trips }); 
  }

  setFirstPage(){
    this.showElements.paginator.firstPage();
  }

}

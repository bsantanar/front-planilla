import { Component, OnInit, Input } from '@angular/core';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reserve-error',
  templateUrl: './reserve-error.component.html',
  styleUrls: ['./reserve-error.component.css']
})
export class ReserveErrorComponent implements OnInit {

  activeRate: boolean = false;
  @Input() error: any;

  constructor(private reserveService: ReserveService) { }

  ngOnInit() {
  }



  rateReserve(value: number, reserve: any){
    reserve.error.dealValue = value;
    this.activeRate = !this.activeRate;
    this.reserveService.updateReserveTariff(reserve).subscribe(
      res => { 
        console.log(res);
      },
      err => { 
        console.log(err); 
      }
    );
  }

}

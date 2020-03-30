import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from 'src/app/domain/reservation';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  @Input() detail: Reservation;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }

}

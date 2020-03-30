import { Component, OnInit, Input } from '@angular/core';
import { Approach } from 'src/app/domain/approach';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss']
})
export class ApproachComponent implements OnInit {

  @Input() approach: Approach;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    //console.log(this.approach);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Approach } from 'src/app/domain/approach';
import { ApproachService } from 'src/app/services/approach.service';

@Component({
  selector: 'app-approach-error',
  templateUrl: './approach-error.component.html',
  styleUrls: ['./approach-error.component.scss']
})
export class ApproachErrorComponent implements OnInit {

  activeRate: boolean = false;
  @Input() error: Approach;

  constructor(private approachService: ApproachService) { }

  ngOnInit() {
  }

  rateApproach(value: number, approach: Approach){
    if(value > 1){
      console.log(approach);
      approach.cost = value;
      let obj = {
        apprchPk: approach.approachPK,
        apprchValTariff: value
      };
      this.activeRate = !this.activeRate;
      this.approachService.updateApproachTariff(obj).subscribe(
        res => { 
          //console.log(res);
        },
        err => { 
          //console.log(err); 
        }
      );
    }
  }

}

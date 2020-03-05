import { Component, OnInit, Input } from '@angular/core';
import { Approach } from 'src/app/classes/approach';

@Component({
  selector: 'app-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss']
})
export class ApproachComponent implements OnInit {

  @Input() approach: Approach;

  constructor() { }

  ngOnInit() {
  }

}

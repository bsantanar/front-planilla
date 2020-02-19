import { Component, OnInit, Input } from '@angular/core';
import { Approach } from 'src/app/classes/approach';

@Component({
  selector: 'app-approach-error',
  templateUrl: './approach-error.component.html',
  styleUrls: ['./approach-error.component.css']
})
export class ApproachErrorComponent implements OnInit {

  @Input() error: Approach;

  constructor() { }

  ngOnInit() {
  }

}

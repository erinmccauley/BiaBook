import { Component, Input, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-starrating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./starrating.component.css']
})
export class StarratingComponent implements OnInit {
@Input() rating: number;
faStar = faStar;
  constructor() { }

  ngOnInit() {
  }

}

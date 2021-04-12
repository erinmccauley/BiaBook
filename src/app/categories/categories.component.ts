import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  itemsPerSlide = 6;
  singleSlideOffset = true;
  noWrap = true;
  slides = [
    {image: '../../assets/img/vlogo.png', name: 'vegan'},
    {image: '../../assets/img/lcglogo.png', name: 'carb'},
    {image: '../../assets/img/ltlogo.png', name: 'lactose'},
    {image: '../../assets/img/gtnflogo.png', name: 'gluten'},
    {image: '../../assets/img/sflogo.png', name: 'sugar'},
    {image: '../../assets/img/mtflogo.png', name: 'veg'}
  ];

  @Output() childEvent = new EventEmitter();

  recipeFilter(filter: any){
    this.childEvent.emit(filter);
  }

  constructor() { }

  ngOnInit() {
  }

}

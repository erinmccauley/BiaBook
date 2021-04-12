/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MealcategoriesService } from './mealcategories.service';

describe('Service: Mealcategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MealcategoriesService]
    });
  });

  it('should ...', inject([MealcategoriesService], (service: MealcategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

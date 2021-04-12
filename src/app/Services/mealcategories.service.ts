import { MealCategory } from './../mealcategory';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealcategoriesService {

  baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';
  mealCategories: MealCategory[];

constructor(private http: HttpClient) { }

getAll(): Observable<MealCategory[]> {
  return this.http.get<MealCategory[]>(`${this.baseUrl}/mealcategories.php`);
}

getByName(meal): Observable<MealCategory[]> {
  const params = new HttpParams().set('meal', meal);
  return this.http.get<MealCategory[]>(`${this.baseUrl}/mealcategory.php`, {params:params});
}

private handleError(error: HttpErrorResponse) {
  console.log(error);

  return throwError('Error! Something went wrong.');

}






}

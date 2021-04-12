import { RecipeCategory } from './../recipecategory';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';


constructor(private http: HttpClient) { }

getAll(): Observable<RecipeCategory[]> {
  return this.http.get<RecipeCategory[]>(`${this.baseUrl}/recipecategories.php`);
}

private handleError(error: HttpErrorResponse) {
  console.log(error);

  return throwError('Error! Something went wrong.');

}
}

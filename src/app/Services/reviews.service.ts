import { Review } from './../review';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';

constructor(private http: HttpClient) { }

getAll(recipeId): Observable<Review[]> {
  const params = new HttpParams().set('recipeId', recipeId);
  return this.http.get<Review[]>(`${this.baseUrl}/reviews.php`, {params:params});
}

postReview(authorId, dateModified, dateSubmitted, rating, recipeId, review) {
  return this.http.post<Review>(`${environment.apiUrl}/createreview.php`, {authorId,dateSubmitted, dateModified, rating, recipeId,review})
    .pipe(map(review => {
      return review;
    }));
}

private handleError(error: HttpErrorResponse) {
  console.log(error);

  return throwError('Error! Something went wrong.');

}

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServingsService {

  baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';
  

constructor(private http: HttpClient) { }

getAll(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/servings.php`);
}

private handleError(error: HttpErrorResponse) {
  console.log(error);

  return throwError('Error! Something went wrong.');

}

}

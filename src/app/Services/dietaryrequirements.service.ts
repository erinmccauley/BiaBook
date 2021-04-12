import { DietaryRequirement } from './../dietaryrequirement';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DietaryrequirementsService {

  baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';
  dietaryRequirements: DietaryRequirement[];

constructor(private http: HttpClient) { }

getAll(): Observable<DietaryRequirement[]> {
  return this.http.get<DietaryRequirement[]>(`${this.baseUrl}/dietaryrequirements.php`);
}

private handleError(error: HttpErrorResponse) {
  console.log(error);

  return throwError('Error! Something went wrong.');

}


}

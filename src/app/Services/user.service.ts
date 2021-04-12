import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

getAll(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrl}/getusers.php`);
}

async delete(userId) {
  return this.http.post<any>(`${environment.apiUrl}/deleteuser.php`, { userId }).toPromise();
}

}

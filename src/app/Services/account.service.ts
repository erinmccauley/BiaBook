import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/login.php`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setToken(user[0].username);
                this.getLoggedInName.emit(true);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    public userregistration(name, email, pwd) {
        return this.http.post<any>(`${environment.apiUrl}/register.php`, { name, email, pwd })
            .pipe(map(Users => {
                return Users;
            }));
    }
    
    async getIdByUsername(username):  Promise<any> {
        const params = new HttpParams().set('username', username);
        return this.http.get<any>(`${environment.apiUrl}/userbyusername.php`, {params: params}).toPromise();
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    sessionStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

    setToken(token: string) {
        console.log(token);
        sessionStorage.setItem('token', token);
        }

    getToken() {
        return sessionStorage.getItem('token');
    }
    deleteToken() {
        sessionStorage.removeItem('token');
    }
    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}



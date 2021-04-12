import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../Services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const routeurl: string = state.url;
        if(routeurl.includes('admin')){
            return this.isAdmin();
        }
        return this.isLogin(routeurl);
    }

    isLogin(routeurl: string) {
        if (this.accountService.isLoggedIn()) {
            return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl } });
    }

    isAdmin() {
        if(sessionStorage.getItem('token') === 'admin'){
            return true;
        }

        this.router.navigate(['/']);
    }
}
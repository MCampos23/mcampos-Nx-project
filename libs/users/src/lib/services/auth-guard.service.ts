import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private localStorageToken: LocalstorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.localStorageToken.getToken().split('.')[1];
        if (token) {
            const decodedToken = JSON.parse(atob(token));
            if (decodedToken.isAdmin && !this._tokenExpired(decodedToken.exp)) return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    _tokenExpired(expiration: any): boolean {
      return Math.floor(new Date().getTime() / 1000) >= expiration
    }
}

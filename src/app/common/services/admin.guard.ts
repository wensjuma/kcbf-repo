import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        route;
        const url: string = state.url;
        return this.checkUser(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
    checkUser(url: string): boolean {
        if (this._authService.currentUser.scope.includes("HR", "USER")) 
        {  
            return true;
         }
        // Store the attempted URL for redirecting
        // this._authService.redirectURL = url;

        // // Navigate to the login page with extras
        this._router.navigate(['main/interviews/list/interviews'], { queryParams: { r: url }});
        return false;
    }
}

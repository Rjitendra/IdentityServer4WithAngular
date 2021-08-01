
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roles = route.data['roles'] as Array<string>;
        if (!roles) {
            return this.checkIsUserAuthenticated();
        }
        else {
            return this.checkForAdministrator();
        }
    }

    private checkIsUserAuthenticated() {
        return this.authService.isAuthenticated()
            .then(res => {
                debugger;
                return res ? true : this.redirectToUnauthorized();
            });
    }

    private checkForAdministrator() {
        return this.authService.checkIfUserIsAdmin()
            .then(res => {
                return res ? true : this.redirectToUnauthorized();
            });
    }

    private redirectToUnauthorized() {
        debugger;
        //  this._router.navigate(['/unauthorized']);
        this.authService.login();
        return false;
    }
}

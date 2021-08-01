import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

import { Subject } from 'rxjs';
import * as Oidc from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userManager: UserManager;
    private user: User;
    private loginChangedSubject = new Subject<boolean>();

    public loginChanged = this.loginChangedSubject.asObservable();

    private get idpSettings(): UserManagerSettings {
        return {
            authority: environment.stsBaseUrl,
            client_id: 'angular-client',
            redirect_uri: `${environment.clientBaseUrl}/signin-callback`,
            scope: 'openid profile companyApi',
            response_type: 'code',
            post_logout_redirect_uri: `${environment.clientBaseUrl}`,
            automaticSilentRenew: true,
            silent_redirect_uri: `${environment.clientBaseUrl}/assets/silent-callback.html`,
            loadUserInfo: true,
            userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),




        };
    }

    constructor() {
        this.userManager = new UserManager(this.idpSettings);
        this.userManager.events.addAccessTokenExpired(_ => {
            this.loginChangedSubject.next(false);
        });
    }
    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }
    public renewToken(): Promise<User> {
        return this.userManager.signinSilent();
    }
    public login = () => {
        return this.userManager.signinRedirect({ state: window.location.href });
    }

    public isAuthenticated = (): Promise<boolean> => {
        return this.userManager.getUser()
            .then(user => {
                if (this.user !== user) {
                    this.loginChangedSubject.next(this.checkUser(user));
                }

                this.user = user;

                return this.checkUser(user);
            });
    }

    public finishLogin = (): Promise<User> => {
        return this.userManager.signinRedirectCallback()
            .then(user => {
                this.loginChangedSubject.next(this.checkUser(user));
                return user;
            });
    }

    public logout = () => {
        this.userManager.signoutRedirect();
    }

    public finishLogout = () => {
        this.user = null;
        this.loginChangedSubject.next(false);
        return this.userManager.signoutRedirectCallback();
    }

    public getAccessToken = (): Promise<string> => {
        return this.userManager.getUser()
            .then(user => {
                return !!user && !user.expired ? user.access_token : null;
            });
    }

    public checkIfUserIsAdmin = (): Promise<boolean> => {
        return this.userManager.getUser()
            .then(user => {
                return !user?.expired && user?.profile.role === 'Admin';
            });
    }

    private checkUser = (user: User): boolean => {
        return !!user && !user.expired;
    }
}

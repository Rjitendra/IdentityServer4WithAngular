import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.apiBaseUrl)) {
            return from(
                this.authService.getAccessToken()
                    .then(token => {
                        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
                        const authRequest = req.clone({ headers });
                        return next.handle(authRequest)
                            .pipe(
                                catchError((err: HttpErrorResponse) => {
                                    if (err && (err.status === 401 || err.status === 403)) {
                                        this.router.navigate(['/unauthorized']);
                                    }
                                    // tslint:disable-next-line:no-string-throw
                                    throw 'error in a request ' + err.status;
                                })
                            ).toPromise();
                    })
            );
        }
        else {
            return next.handle(req);
        }
    }
}

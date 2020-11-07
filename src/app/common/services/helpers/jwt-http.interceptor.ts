import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = sessionStorage.getItem('auth_token')? sessionStorage.getItem('auth_token').replace(/^"|"$/g, ''):"";
        

        if (idToken) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `${idToken}`
                }
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }

    }
}

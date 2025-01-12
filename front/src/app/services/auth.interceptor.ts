import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * AuthInterceptor is responsible for adding the JWT token to the headers of outgoing HTTP requests.
 * It intercepts HTTP requests and adds the Authorization header if the token is available.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) { }

    /**
   * Intercepts HTTP requests and adds the Authorization header if the token is available.
   * @param request - The outgoing HTTP request.
   * @param next - The next handler in the HTTP request chain.
   * @returns An Observable of the HTTP event.
   */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = this.authService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request);
    }
}

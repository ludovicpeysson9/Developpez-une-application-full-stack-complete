import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * AuthGuard is responsible for protecting routes from unauthorized access.
 * It checks if the user is logged in and redirects accordingly.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    /**
   * Determines if a route can be activated.
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns A boolean or UrlTree indicating if the route can be activated.
   */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const isLoggedIn = this.authService.isLoggedIn();

        // Redirect authenticated users away from public routes
        if (isLoggedIn && (state.url === '/' || state.url === '/connexion' || state.url === '/registration')) {
            return this.router.createUrlTree(['/myAccount']);
        }

        // Redirect unauthenticated users to the login page for protected routes
        if (!isLoggedIn && state.url !== '/' && state.url !== '/connexion' && state.url !== '/registration') {
            return this.router.createUrlTree(['/connexion']);
        }

        return true;
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    /*canActivate(): boolean {
        const isLoggedIn = this.authService.isLoggedIn();

        if (this.authService.isLoggedIn()) {
            return true; // L'utilisateur est connecté
        }

        // Redirige vers la page de connexion
        this.router.navigate(['/connexion']);
        return false;
    }*/

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.authService.isLoggedIn();

        // Redirige les utilisateurs authentifiés loin des routes publiques
        if (isLoggedIn && (state.url === '/' || state.url === '/connexion' || state.url === '/registration')) {
            this.router.navigate(['/myAccount']);
            return false;
        }

        // Redirige les utilisateurs non authentifiés vers la page de connexion pour les routes protégées
        if (!isLoggedIn && state.url !== '/' && state.url !== '/connexion' && state.url !== '/registration') {
            this.router.navigate(['/connexion']);
            return false;
        }

        return true;
    }
}

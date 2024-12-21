import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true; // L'utilisateur est connecté
        }

        // Redirige vers la page de connexion
        this.router.navigate(['/connexion']);
        return false;
    }
}
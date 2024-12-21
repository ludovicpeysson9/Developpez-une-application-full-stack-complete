import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly tokenKey = 'access_token'; // Clé de stockage pour le token

    // Récupère le token JWT depuis le stockage local
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Stocke le token JWT
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    // Supprime le token (déconnexion)
    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    // Vérifie si le token est expiré
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const exp = decodedToken.exp ?? 0; // Expiration timestamp
            return Date.now() >= exp * 1000;
        } catch (error) {
            return true; // Considérer le token comme invalide en cas d'erreur
        }
    }

    // Vérifie si l'utilisateur est connecté
    isLoggedIn(): boolean {
        return !this.isTokenExpired();
    }
}

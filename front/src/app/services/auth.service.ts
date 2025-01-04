import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private readonly tokenKey = 'access_token'; // Clé de stockage pour le token

    constructor(private http: HttpClient) {}

    login(identifier: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { identifier, password });
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password });
    }

    // Récupère le token JWT depuis le stockage local
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Stocke le token JWT
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getUserId(): string | null {
        return localStorage.getItem('user_id');
    }
    
      // Méthode pour récupérer le nom d'utilisateur
    getUsername(): string | null {
        return localStorage.getItem('username');
    }
    
      // Méthode pour récupérer l'email de l'utilisateur
    getEmail(): string | null {
        return localStorage.getItem('email');
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

    updateUser(userId: number, username: string, email: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const url = `http://localhost:8080/api/user/${userId}`;
        const body = { username, email };
        return this.http.put(url, body, { headers });
    }

    // Vérifie si l'utilisateur est connecté
    isLoggedIn(): boolean {
        return !this.isTokenExpired();
    }

    logout(): void {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('access_token');
    }
}

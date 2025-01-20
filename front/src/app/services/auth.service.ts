import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UpdateUserRequest {
    username: string;
    email: string;
    password?: string;
}

/**
 * AuthService is responsible for handling authentication-related operations.
 * It interacts with the backend API to login, register, and manage user tokens.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl: string = 'http://localhost:8080/api';
    private readonly tokenKey: string = 'access_token';

    constructor(private http: HttpClient) { }

    /**
   * Logs in a user with the provided identifier and password.
   * @param identifier - The user's identifier (username or email).
   * @param password - The user's password.
   * @returns An Observable of any type.
   */
    login(identifier: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, { identifier, password }).pipe(
            catchError(this.handleError)
        );
    }

    /**
   * Registers a new user with the provided username, email, and password.
   * @param username - The user's username.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns An Observable of any type.
   */
    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/register`, { username, email, password }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Retrieves the JWT token from local storage.
     * @returns The JWT token or null if not found.
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
 * Stores the JWT token in local storage.
 * @param token - The JWT token to store.
 */
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
 * Retrieves the user ID from local storage.
 * @returns The user ID or null if not found.
 */
    getUserId(): string | null {
        return localStorage.getItem('user_id');
    }

    /**
   * Retrieves the username from local storage.
   * @returns The username or null if not found.
   */
    getUsername(): string | null {
        return localStorage.getItem('username');
    }

    /**
   * Retrieves the email from local storage.
   * @returns The email or null if not found.
   */
    getEmail(): string | null {
        return localStorage.getItem('email');
    }

    /**
   * Checks if the JWT token is expired.
   * @returns A boolean indicating if the token is expired.
   */
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const exp = decodedToken.exp ?? 0; // Expiration timestamp
            return Date.now() >= exp * 1000;
        } catch (error) {
            return true; // Consider the token as invalid in case of error
        }
    }

    /**
   * Updates the user's information.
   * @param userId - The ID of the user.
   * @param username - The new username.
   * @param email - The new email.
   * @returns An Observable of any type.
   */
    updateUser(userId: number, username: string, email: string, password?: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const url = `${this.apiUrl}/user/${userId}`;
        const body: UpdateUserRequest = { username, email, password };
        return this.http.put<any>(url, body, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Handles HTTP errors.
     * @param error - The HTTP error response.
     * @returns An Observable that throws an error.
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    /**
    * Checks if the user is logged in.
    * @returns A boolean indicating if the user is logged in.
    */
    isLoggedIn(): boolean {
        return !this.isTokenExpired();
    }

    /**
     * Logs out the user by removing user data from local storage.
     */
    logout(): void {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem(this.tokenKey);
    }
}

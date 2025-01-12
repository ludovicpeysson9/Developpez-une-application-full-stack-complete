import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Theme } from './../models/theme.model'
import { AuthService } from './auth.service';

/**
 * ThemeService is responsible for handling theme-related operations.
 * It interacts with the backend API to fetch, subscribe, and unsubscribe themes.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService { 
  private apiUrl = 'http://localhost:8080/api/themes';

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Fetches all themes from the backend API.
   * @returns An Observable of Theme array.
   */
  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.apiUrl).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Fetches themes subscribed by a specific user.
   * @param userId - The ID of the user.
   * @returns An Observable of Theme array.
   */
  getUserThemes(userId: number): Observable<Theme[]> {
    const token: string | null = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Theme[]>(`${this.apiUrl}/user/${userId}`, { headers }).pipe(
      catchError(this.handleNoContentError.bind(this))
    );
  }

  /**
   * Subscribes a user to a specific theme.
   * @param userId - The ID of the user.
   * @param themeId - The ID of the theme.
   * @returns An Observable of any type.
   */
  subscribe(userId: number, themeId: number): Observable<any> {
    const subscribeUrl: string = 'http://localhost:8080/api/subscriptions';
    const token: string | null = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body: { userId: number; themeId: number } = { userId, themeId };
    return this.http.post(subscribeUrl, body, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Unsubscribes a user from a specific theme.
   * @param userId - The ID of the user.
   * @param themeId - The ID of the theme.
   * @returns An Observable of any type.
   */
  unsubscribe(userId: number, themeId: number): Observable<any> {
    const unsubscribeUrl: string = 'http://localhost:8080/api/subscriptions';
    const token: string | null = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body: { userId: number; themeId: number } = { userId, themeId };
    return this.http.request('delete', unsubscribeUrl, { headers, body }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Handles HTTP errors for requests that return no content.
   * @param error - The HTTP error response.
   * @returns An Observable of an empty Theme array.
   */
  private handleNoContentError(error: HttpErrorResponse): Observable<Theme[]> {
    if (error.status === 204) {
      return of([]); 
    } else {
      return this.handleError(error);
    }
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
}

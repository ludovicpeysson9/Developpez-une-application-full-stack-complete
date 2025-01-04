import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Theme } from './../models/theme.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService { // A remplacer par liste tirée de BDD, unique 
  private apiUrl = 'http://localhost:8080/api/themes';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupère tous les articles
  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.apiUrl);
  }

  getUserThemes(userId: number): Observable<Theme[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Theme[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  subscribe(userId: number, themeId: number): Observable<any> {
    const subscribeUrl = 'http://localhost:8080/api/subscriptions';
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { userId, themeId };
    return this.http.post(subscribeUrl, body, { headers });
  }
  
  unsubscribe(userId: number, themeId: number): Observable<any> {
    const unsubscribeUrl = 'http://localhost:8080/api/subscriptions';
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { userId, themeId };
    return this.http.request('delete', unsubscribeUrl, { headers, body });
  }
}

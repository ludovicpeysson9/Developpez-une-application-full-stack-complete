import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article, ArticleInput } from './../models/article.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}`);
  }

  // Récupère un article par ID
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: ArticleInput): Observable<Article> {
    
    const token = this.authService.getToken();// Récupérer le token d'accès
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const createArticleUrl = `${this.apiUrl}/createArticle`;
    console.log('API URL:', this.apiUrl);
    console.log('Headers:', headers);
    console.log('Article Data:', article);
    return this.http.post<Article>(createArticleUrl, article, { headers });
  }
}

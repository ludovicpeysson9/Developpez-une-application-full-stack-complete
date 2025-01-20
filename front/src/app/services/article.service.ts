import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article, ArticleInput } from './../models/article.model';
import { AuthService } from './auth.service';

/**
 * ArticleService is responsible for handling article-related operations.
 * It interacts with the backend API to fetch, create, and manage articles.
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl: string = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Fetches all articles from the backend API.
   * @returns An Observable of Article array.
   */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches an article by ID from the backend API.
   * @param id - The ID of the article.
   * @returns An Observable of the Article.
   */
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Article not found'));
        }
        return this.handleError(error);
      })
    );
  }

  /**
   * Creates a new article.
   * @param article - The article to create.
   * @returns An Observable of the created Article.
   */
  createArticle(article: ArticleInput): Observable<Article> {
    const token: string | null = this.authService.getToken(); // Retrieve the access token
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const createArticleUrl: string = `${this.apiUrl}/createArticle`;
    return this.http.post<Article>(createArticleUrl, article, { headers }).pipe(
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
}

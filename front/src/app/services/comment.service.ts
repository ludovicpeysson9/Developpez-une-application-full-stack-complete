import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from 'src/app/models/comment.model';

/**
 * CommentService is responsible for handling comment-related operations.
 * It interacts with the backend API to fetch and create comments.
 */
@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly apiUrl: string = 'http://localhost:8080/api/comments';

    constructor(private http: HttpClient) { }

    /**
   * Fetches comments by article ID from the backend API.
   * @param articleId - The ID of the article.
   * @returns An Observable of Comment array.
   */
    getCommentsByArticleId(articleId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/article/${articleId}`).pipe(
            catchError(this.handleError)
        );
    }

    /**
   * Creates a new comment.
   * @param comment - The comment to create.
   * @returns An Observable of the created Comment.
   */
    createComment(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.apiUrl, comment).pipe(
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
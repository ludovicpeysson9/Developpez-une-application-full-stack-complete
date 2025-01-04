import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:8080/api/comments'; // URL de l'API pour les commentaires

    constructor(private http: HttpClient) { }

    // Méthode pour récupérer les commentaires par ID d'article
    getCommentsByArticleId(articleId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/article/${articleId}`);
    }

    createComment(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.apiUrl, comment);
    }
}
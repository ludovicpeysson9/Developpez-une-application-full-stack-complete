import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { Article } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  comments: Comment[] = []; // Liste des commentaires
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = Number(params.get('id')); // Convertir en number
      if (articleId) {
        this.articleService.getArticleById(articleId).subscribe((article) => {
          this.article = article;
        });
        this.loadComments(articleId);
      }
    });
  }

  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticleId(articleId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  addComment() {
    const ownerId = Number(localStorage.getItem('user_id'));
    const ownerUsername = localStorage.getItem('username') || 'Anonyme';

    if (this.newComment.trim() && this.article && ownerId && ownerUsername) {
      const newComment: Comment = {
        id: 0, // L'ID sera généré par le backend
        content: this.newComment,
        ownerId: ownerId,
        ownerUsername: ownerUsername,
        articleId: this.article.id
      };

      this.commentService.createComment(newComment).subscribe((comment) => {
        this.comments.push(comment); // Ajouter le nouveau commentaire à la liste des commentaires
        this.newComment = ''; // Réinitialiser le champ de commentaire
      });
    }
  }
}


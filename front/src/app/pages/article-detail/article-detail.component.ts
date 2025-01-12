import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { Article } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comment.model';

/**
 * ArticleDetailComponent is responsible for displaying the details of an article.
 * It handles loading the article and its comments, and adding new comments.
 */
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = Number(params.get('id'));
      if (articleId) {
        this.loadArticle(articleId);
        this.loadComments(articleId);
      }
    });
  }

  /**
   * Loads the article by its ID.
   * @param articleId - The ID of the article to load.
   */
  private loadArticle(articleId: number): void {
    this.articleService.getArticleById(articleId).subscribe((article) => {
      this.article = article;
    });
  }

  /**
   * Loads the comments for the article by its ID.
   * @param articleId - The ID of the article to load comments for.
   */
  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticleId(articleId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  /**
   * Adds a new comment to the article.
   */
  addComment() {
    const ownerId = Number(localStorage.getItem('user_id'));
    const ownerUsername = localStorage.getItem('username') || 'Anonyme';

    if (this.newComment.trim() && this.article && ownerId && ownerUsername) {
      const newComment: Comment = {
        id: 0,
        content: this.newComment,
        ownerId: ownerId,
        ownerUsername: ownerUsername,
        articleId: this.article.id
      };

      this.commentService.createComment(newComment).subscribe((comment) => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }
}


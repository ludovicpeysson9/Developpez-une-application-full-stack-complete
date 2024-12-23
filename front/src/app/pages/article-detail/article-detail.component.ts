import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  comments: { username: string; content: string }[] = []; // Liste des commentaires
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe((article) => {
        if (article) {
          this.article = article;
          // Charger des commentaires simulés (à remplacer par une source réelle)
          this.comments = [
            { username: 'User1', content: 'Très bon article, merci !' },
            { username: 'User2', content: 'Quelques points à clarifier, mais intéressant.' }
          ];
        } else {
          this.router.navigate(['/404']);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ username: 'Vous', content: this.newComment });
      this.newComment = ''; // Réinitialise le champ
    }
  }
}


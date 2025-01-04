import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service'; // Assurez-vous du bon chemin
import { Theme } from 'src/app/models/theme.model'; // Assurez-vous du bon chemin
import { ArticleService } from 'src/app/services/article.service';
import { ArticleInput } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  title: string = '';
  content: string = '';
  themeId: number | null = null;
  authorId: number | undefined;
  themes: Theme[] = [];

  constructor(private router: Router, private themeService: ThemeService, private articleService: ArticleService, private authService: AuthService) {

  }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur
    const userId = this.authService.getUserId();
    this.authorId = userId ? parseInt(userId, 10) : undefined;

    // Log pour vérifier l'ID de l'utilisateur
    console.log("User ID is:", this.authorId);

    // Récupérer les thèmes
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
        console.log("Themes loaded:", themes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des thèmes:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.themeId && this.title && this.content && this.authorId) {
      const newArticle: ArticleInput = {
        title: this.title,
        content: this.content,
        authorId: this.authorId,
        themeId: this.themeId
      };

      console.log('Sending new article to backend:', newArticle);

      this.articleService.createArticle(newArticle).subscribe({
        next: (article) => {
          this.router.navigate([`/article/${article.id}`]); // Assuming 'id' is returned
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'article:', error);
          alert('Erreur lors de la création de l\'article');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

}

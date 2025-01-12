import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleInput } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * CreateArticleComponent is responsible for handling the creation of a new article.
 * It manages the article creation form and handles the submission process.
 */
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  title: string = '';
  content: string = '';
  themeId: number | undefined;
  authorId: number | undefined;
  themes: Theme[] = [];

  constructor(private router: Router, private themeService: ThemeService, private articleService: ArticleService, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.authorId = parseInt(this.authService.getUserId() || '0', 10);
    this.loadThemes();
  }

  /**
   * Loads the available themes from the backend.
   */
  private loadThemes(): void {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des thèmes:', error);
      }
    });
  }

  /**
 * Handles the article creation form submission.
 */
  onSubmit(): void {
    if (!this.themeId || this.themeId === null) {
      this.snackBar.open('Veuillez sélectionner un thème.', 'Fermer', {
        duration: 2000,
      });
      return;
    }

    if (!this.title || !this.content || !this.authorId) {
      this.snackBar.open('Veuillez remplir tous les champs du formulaire.', 'Fermer', {
        duration: 2000,
      });
      return;
    }

    const newArticle: ArticleInput = {
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      themeId: this.themeId
    };

    this.articleService.createArticle(newArticle).subscribe({
      next: (article) => {
        this.snackBar.open('Article créé avec succès', 'Fermer', {
          duration: 2000,
        });
        this.router.navigate([`/article/${article.id}`]);
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'article:', error);
        this.snackBar.open('Erreur lors de la création de l\'article', 'Fermer', {
          duration: 2000,
        });
      }
    });
  }

}

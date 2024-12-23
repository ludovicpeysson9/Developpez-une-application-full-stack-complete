import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service'; // Assurez-vous du bon chemin
import { Theme } from 'src/app/models/theme.model'; // Assurez-vous du bon chemin

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  themes: Theme[] = [];  theme: string = '';
  title: string = '';
  content: string = '';

  constructor(private router: Router, private themeService: ThemeService) {}

  goBack() {
    this.router.navigate(['/articles']); // Remplacez '/articles' par la route souhaitée
  }

  onSubmit() {
    if (this.theme && this.title && this.content) {
      console.log('Nouvel article:', {
        theme: this.theme,
        title: this.title,
        content: this.content,
      });
      alert('Article créé avec succès !');
      this.router.navigate(['/articles']); // Redirige après la création
    }
  }

  ngOnInit(): void {
    // Récupère les thèmes via le service
    this.themeService.getThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

}

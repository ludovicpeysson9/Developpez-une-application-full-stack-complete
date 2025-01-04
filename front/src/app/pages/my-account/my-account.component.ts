import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  username: string | null = '';
  email: string | null = '';
  subscriptions: Theme[] = []; // Récupéré depuis le service

  constructor(private router: Router, private themeService: ThemeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    const userId = localStorage.getItem('user_id');
    // Récupère les thèmes depuis le service
    if (userId) {
      this.themeService.getUserThemes(parseInt(userId, 10)).subscribe((themes) => {
        this.subscriptions = themes; // Assigne les thèmes récupérés
      });
    }

    console.log('Stored user_id:', localStorage.getItem('user_id'));
    console.log('Stored username:', localStorage.getItem('username'));
    console.log('Stored email:', localStorage.getItem('email'));
    console.log('Stored access_token:', localStorage.getItem('access_token'));
  }

  saveProfile(): void {
    const userId = this.authService.getUserId();
    if (userId && this.username && this.email && this.email.includes('@')) {
      this.authService.updateUser(parseInt(userId, 10), this.username, this.email).subscribe({
        next: () => {
          localStorage.setItem('username', this.username as string);
          localStorage.setItem('email', this.email as string);
          alert('Profil mis à jour avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          alert('Erreur lors de la mise à jour du profil');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  logout(): void {
    this.authService.logout();
    alert('Déconnexion réussie');
    this.router.navigate(['/connexion']); // Redirige vers la page de connexion
  }

  unsubscribe(themeId: number): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.themeService.unsubscribe(parseInt(userId, 10), themeId).subscribe({
        next: () => {
          this.subscriptions = this.subscriptions.filter(theme => theme.id !== themeId);
          alert('Désabonné avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la désinscription:', error);
          alert('Erreur lors de la désinscription');
        }
      });
    }
  }

}

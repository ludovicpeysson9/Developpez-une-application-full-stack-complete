import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * MyAccountComponent is responsible for displaying and managing the user's account.
 * It handles updating the user's profile, logging out, and unsubscribing from themes.
 */
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  username: string | null = '';
  email: string | null = '';
  subscriptions: Theme[] = [];

  constructor(private router: Router, private themeService: ThemeService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.loadSubscriptions();
  }

  /**
   * Loads the user's subscriptions from the backend.
   */
  private loadSubscriptions(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.themeService.getUserThemes(parseInt(userId, 10)).subscribe((themes) => {
        this.subscriptions = themes;
      });
    }
  }

  /**
 * Updates the user's profile.
 */
  saveProfile(): void {
    const userId = this.authService.getUserId();
    if (userId && this.username && this.email && this.email.includes('@')) {
      this.authService.updateUser(parseInt(userId, 10), this.username, this.email).subscribe({
        next: () => {
          localStorage.setItem('username', this.username as string);
          localStorage.setItem('email', this.email as string);
          this.snackBar.open('Profil mis à jour avec succès', 'Fermer', {
            duration: 2000,
          });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          this.snackBar.open('Erreur lors de la mise à jour du profil', 'Fermer', {
            duration: 2000,
          });
        }
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'Fermer', {
        duration: 2000,
      });
    }
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    this.authService.logout();
    this.snackBar.open('Déconnexion réussie', 'Fermer', {
      duration: 2000,
    });
    this.router.navigate(['/connexion']);
  }

  /**
   * Unsubscribes the user from a theme.
   * @param themeId - The ID of the theme to unsubscribe from.
   */
  unsubscribe(themeId: number): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.themeService.unsubscribe(parseInt(userId, 10), themeId).subscribe({
        next: () => {
          this.subscriptions = this.subscriptions.filter(theme => theme.id !== themeId);
          this.snackBar.open('Désabonné avec succès', 'Fermer', {
            duration: 2000,
          });
        },
        error: (error) => {
          console.error('Erreur lors de la désinscription:', error);
          this.snackBar.open('Erreur lors de la désinscription', 'Fermer', {
            duration: 2000,
          });
        }
      });
    }
  }

}

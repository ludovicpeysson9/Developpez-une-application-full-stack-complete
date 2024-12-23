import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  username: string = 'Username';
  email: string = 'email@email.fr';
  subscriptions: Theme[] = []; // Récupéré depuis le service

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Récupère les thèmes depuis le service
    this.themeService.getThemes().subscribe((themes) => {
      this.subscriptions = themes; // Assigne les thèmes récupérés
    });
  }

  saveProfile(): void {
    alert('Profil sauvegardé');
  }

  logout(): void {
    alert('Déconnexion réussie');
    this.router.navigate(['/connexion']); // Redirige vers la page de connexion
  }

  unsubscribe(themeId: string): void {
    this.subscriptions = this.subscriptions.filter(theme => theme.id !== themeId);
    alert('Désabonné avec succès');
  }

}

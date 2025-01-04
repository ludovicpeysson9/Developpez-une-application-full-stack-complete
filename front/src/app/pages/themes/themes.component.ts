import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  isMobile: boolean = false;
  isTablet: boolean = false;  

  themes: Theme[] = [];
  userSubscriptions: Theme[] = [];
  userId: number | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 960px)' // Tablette
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

    this.userId = parseInt(this.authService.getUserId() || '0', 10);

    this.themeService.getAllThemes().subscribe((themes) => {
      this.themes = themes;
    });

    if (this.userId) {
      this.themeService.getUserThemes(this.userId).subscribe((subscriptions) => {
        this.userSubscriptions = subscriptions;
      });
    }

    this.loadThemes();

  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe(themes => {
      this.themes = themes; // Stocke les articles récupérés dans la variable articles
    });
  }

  isSubscribed(themeId: number): boolean {
    return this.userSubscriptions.some((theme) => theme.id === themeId);
  }

  subscribe(themeId: number): void {
    if (this.userId) {
      this.themeService.subscribe(this.userId, themeId).subscribe(() => {
        this.userSubscriptions.push(this.themes.find((theme) => theme.id === themeId)!);
      });
    }
  }

  unsubscribe(themeId: number): void {
    if (this.userId) {
      this.themeService.unsubscribe(this.userId, themeId).subscribe(() => {
        this.userSubscriptions = this.userSubscriptions.filter((theme) => theme.id !== themeId);
      });
    }
  }

}

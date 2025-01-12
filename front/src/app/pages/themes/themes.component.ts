import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * ThemesComponent is responsible for displaying and managing themes.
 * It handles subscribing and unsubscribing to themes.
 */
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
    private authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)',
      '(min-width: 769px) and (max-width: 960px)'
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

    this.userId = parseInt(this.authService.getUserId() || '0', 10);

    this.loadThemes();
    this.loadUserSubscriptions();
  }

  /**
   * Loads all themes.
   */
  loadThemes(): void {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
      },
      error: (error) => {
        console.error('Error loading themes:', error);
      }
    });
  }

  /**
   * Loads the user's subscriptions from the backend.
   */
  private loadUserSubscriptions(): void {
    if (this.userId) {
      this.themeService.getUserThemes(this.userId).subscribe({
        next: (subscriptions) => {
          this.userSubscriptions = subscriptions;
        },
        error: (error) => {
          console.error('Error fetching user themes:', error);
          this.userSubscriptions = []; // Initialize to an empty array in case of error
        }
      });
    }
  }

  /**
   * Checks if the user is subscribed to a theme.
   * @param {number} themeId - The ID of the theme to check.
   * @returns {boolean} True if the user is subscribed, false otherwise.
   */
  isSubscribed(themeId: number): boolean {
    return this.userSubscriptions && this.userSubscriptions.some((theme) => theme.id === themeId);
  }

  /**
   * Subscribes the user to a theme.
   * @param {number} themeId - The ID of the theme to subscribe to.
   */
  subscribe(themeId: number): void {
    if (this.userId) {
      this.themeService.subscribe(this.userId, themeId).subscribe({
        next: () => {
          if (!this.userSubscriptions) {
            this.userSubscriptions = [];
          }
          const theme = this.themes.find((theme) => theme.id === themeId);
          if (theme) {
            this.userSubscriptions.push(theme);
          }
          this.snackBar.open('Subscribed successfully', 'Close', {
            duration: 500,
          });
        },
        error: (error) => {
          console.error('Error subscribing to theme:', error);
          this.snackBar.open('Error subscribing to theme', 'Close', {
            duration: 500,
          });
        }
      });
    }
  }

  /**
   * Unsubscribes the user from a theme.
   * @param {number} themeId - The ID of the theme to unsubscribe from.
   */
  unsubscribe(themeId: number): void {
    if (this.userId) {
      this.themeService.unsubscribe(this.userId, themeId).subscribe({
        next: () => {
          this.userSubscriptions = this.userSubscriptions.filter(theme => theme.id !== themeId);
          this.snackBar.open('Unsubscribed successfully', 'Close', {
            duration: 500,
          });
        },
        error: (error) => {
          console.error('Error unsubscribing from theme:', error);
          this.snackBar.open('Error unsubscribing from theme', 'Close', {
            duration: 500,
          });
        }
      });
    }
  }

}

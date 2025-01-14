import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  isMobile: boolean = false;
  isTablet: boolean = false;

  articles: Article[] = [];
  sortedArticles: Article[] = [];
  userSubscriptions: Theme[] = [];
  userId: number | undefined;
  sortType: string = 'dateAsc';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticleService,
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log('localStorage:', JSON.stringify(localStorage));
    this.breakpointObserver.observe([
      '(max-width: 768px)',
      '(min-width: 769px) and (max-width: 960px)'
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

    this.userId = parseInt(this.authService.getUserId() || '0', 10);

    this.loadArticles();

    if (this.userId) {
      this.themeService.getUserThemes(this.userId).subscribe((subscriptions) => {
        this.userSubscriptions = subscriptions || [];
        this.sortArticles(); // Ensure sorting is updated after fetching subscriptions
      }, error => {
        console.error('Error fetching user themes:', error);
        this.userSubscriptions = []; // Initialize to an empty array in case of error
        this.sortArticles();
      });
    } else {
      this.userSubscriptions = []; // Initialize to an empty array if user is not logged in
      this.sortArticles();
    }
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles; // Store the fetched articles in the articles variable
      this.sortArticles();
    });
  }

  /**
 * Sorts the articles based on the selected sort type.
 */
  sortArticles(): void {
    switch (this.sortType) {
      case 'dateAsc':
        this.sortedArticles = this.articles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'dateDesc':
        this.sortedArticles = this.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'theme':
        const subscribedThemeIds = (this.userSubscriptions || []).map(theme => theme.id);
        this.sortedArticles = this.articles.filter(article => subscribedThemeIds.includes(article.themeId));
        console.log('Filtered Articles by Subscribed Themes:', this.sortedArticles);
        break;
      default:
        this.sortedArticles = this.articles;
        break;
    }
  }

  /**
 * Toggles the sort type and sorts the articles.
 */
  toggleSort(): void {
    if (this.sortType === 'dateAsc') {
      this.sortType = 'dateDesc';
    } else if (this.sortType === 'dateDesc') {
      this.sortType = 'theme';
    } else {
      this.sortType = 'dateAsc';
    }
    this.sortArticles();
  }

  /**
 * Gets the label for the current sort type.
 * @returns The label for the current sort type.
 */
  getSortLabel(): string {
    switch (this.sortType) {
      case 'dateAsc':
        return 'Trier par date (ancien au récent)';
      case 'dateDesc':
        return 'Trier par date (récent au ancien)';
      case 'theme':
        return 'Trier par thème';
      default:
        return 'Trier par';
    }
  }

  /**
 * Gets the icon for the current sort type.
 * @returns The icon for the current sort type.
 */
  getSortIcon(): string {
    return this.sortType === 'dateDesc' ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  /**
 * Navigates to the create article page.
 */
  goToCreateArticle() {
    console.log('Navigating to create article page');
    this.router.navigate(['/createArticle']);
  }

  /**
 * Navigates to the article detail page.
 * @param id - The ID of the article to navigate to.
 */
  goToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }

}

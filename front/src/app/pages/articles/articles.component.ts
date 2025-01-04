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
  userId: number | null = null;
  sortType: string = 'dateAsc'; 

  constructor(
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticleService,
    private router: Router,
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

    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.sortArticles();
    });

    if (this.userId) {
      this.themeService.getUserThemes(this.userId).subscribe((subscriptions) => {
        this.userSubscriptions = subscriptions;
        this.sortArticles(); // Ensure sorting is updated after fetching subscriptions
      });
    }

    this.loadArticles();

  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles; // Stocke les articles récupérés dans la variable articles
    });
  }

  sortArticles(): void {
    switch (this.sortType) {
      case 'dateAsc':
        this.sortedArticles = this.articles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'dateDesc':
        this.sortedArticles = this.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'theme':
        const subscribedThemeIds = this.userSubscriptions.map(theme => theme.id);
        this.sortedArticles = this.articles.filter(article => subscribedThemeIds.includes(article.themeId));
        console.log('Filtered Articles by Subscribed Themes:', this.sortedArticles);
        break;
    }
  }

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

  getSortIcon(): string {
    return this.sortType === 'dateDesc' ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  goToCreateArticle() {
    console.log('Navigating to create article page');
    this.router.navigate(['/createArticle']);
  }

  goToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }

}

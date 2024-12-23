import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  isMobile: boolean = false;
  isTablet: boolean = false;  

  articles: Article[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 960px)' // Tablette
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

    this.loadArticles();

  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles; // Stocke les articles récupérés dans la variable articles
    });
  }

  goToCreateArticle() {
    console.log('Navigating to create article page');
    this.router.navigate(['/createArticle']);
  }

  goToArticle(id: string) {
    this.router.navigate(['/article', id]);
  }

}

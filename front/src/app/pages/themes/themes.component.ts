import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  isMobile: boolean = false;
  isTablet: boolean = false;  

  themes: Theme[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 960px)' // Tablette
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

    this.loadThemes();

  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes; // Stocke les articles récupérés dans la variable articles
    });
  }

}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteStateService } from 'src/app/services/route-state.service';
import { AuthService } from '../../services/auth.service';

/**
 * AppBarComponent is responsible for displaying the application bar.
 * It handles navigation and menu interactions.
 */
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  showUserAvatar: boolean = true;
  showTabs: boolean = true;
  menuOpen: boolean = false;
  activeTab: string = '';
  isActiveAccountPage: boolean = false;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isLoggedIn: boolean = false;
  private clickListener?: () => void;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private router: Router, private routeStateService: RouteStateService, private renderer: Renderer2, private elementRef: ElementRef) {
    this.breakpointObserver.observe([
      '(max-width: 461px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

    this.breakpointObserver.observe([
      '(min-width: 462px) and (max-width: 768px)'
    ]).subscribe(result => {
      this.isTablet = result.matches;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.routeStateService.getCurrentUrl().subscribe(url => {
      const noAvatarAndTabsRoutes = ['/connexion', '/registration'];
      this.isActiveAccountPage = url === '/myAccount';
      this.showUserAvatar = !noAvatarAndTabsRoutes.includes(url) && this.isLoggedIn;
      this.showTabs = !noAvatarAndTabsRoutes.includes(url) && this.isLoggedIn;
    });
  }

  /**
   * Toggles the menu open or closed.
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.addGlobalClickListener();
    } else {
      this.removeGlobalClickListener();
    }
  }

  /**
   * Adds a global click listener to close the menu when clicking outside.
   */
  private addGlobalClickListener(): void {
    this.clickListener = () => {
      if (this.menuOpen) {
        this.closeMenu();
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  /**
   * Removes the global click listener.
   */
  private removeGlobalClickListener(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
      this.clickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.removeGlobalClickListener();
  }

  /**
   * Sets the active tab and closes the menu on mobile.
   * @param tab - The tab to set as active.
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (this.isMobile) {
      this.menuOpen = false; // Close the menu after selection on mobile
    }
  }

  /**
   * Closes the menu.
   */
  closeMenu(): void {
    console.log('Backdrop clicked, closing the menu.');
    this.menuOpen = false;
  }

  /**
   * Navigates to the home page.
   */
  navigateToHome(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/articles']);
    } else {
      this.router.navigate(['/']);
    }
  }

}

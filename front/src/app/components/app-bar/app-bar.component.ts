import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteStateService } from 'src/app/services/route-state.service';
import { AuthService } from '../../services/auth.service';

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
    // Observer pour les mobiles
    this.breakpointObserver.observe([
      '(max-width: 461px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

    // Observer pour les tablettes
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
      // Vérifie si la route actuelle est /myAccount
      this.isActiveAccountPage = url === '/myAccount';
      
      // Contrôle de l'affichage de l'avatar et des onglets en fonction des routes spécifiées
      this.showUserAvatar = !noAvatarAndTabsRoutes.includes(url) && this.isLoggedIn;
      this.showTabs = !noAvatarAndTabsRoutes.includes(url) && this.isLoggedIn;
    });
  }

  /*toggleMenu() {
    console.log("Current menuOpen state before toggle:", this.menuOpen);
    this.menuOpen = !this.menuOpen;
    console.log("Current menuOpen state after toggle:", this.menuOpen);
  }*/

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.addGlobalClickListener();
    } else {
      this.removeGlobalClickListener();
    }
  }

  private addGlobalClickListener() {
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.menuOpen = false;
        this.removeGlobalClickListener();
      }
    });
  }

  private removeGlobalClickListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.removeGlobalClickListener();
  }


  /*goToProfile() {
    // Logique pour rediriger l'utilisateur vers la page de profil
    this.router.navigate(['/myAccount']);
  }*/

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (this.isMobile) {
      this.menuOpen = false; // Ferme le menu après la sélection sur mobile
    }
  }

  closeMenu() {
    console.log('Backdrop clicked, closing the menu.');
    this.menuOpen = false;
  }

  navigateToHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['/articles']);
    } else {
      this.router.navigate(['/']);
    }
  }
  
}

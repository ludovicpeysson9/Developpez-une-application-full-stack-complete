import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * ConnexionComponent is responsible for handling user login.
 * It manages the login form and handles the login process.
 */
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  identifier: string = '';
  password: string = '';
  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)',
      '(min-width: 769px) and (max-width: 960px)'
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });
  }

  /**
 * Handles the login form submission.
 */
  onSubmit() {
    this.authService.login(this.identifier, this.password).subscribe(
      response => {
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('access_token', response.token);

        this.router.navigate(['/articles']);
      },
      error => {
        console.error('Login failed', error);
        this.snackBar.open('Login Failed!', 'Fermer', {
          duration: 2000,
        });
      }
    );
  }

  /**
 * Navigates to the home page.
 */
  navigateToHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/articles']);
    } else {
      this.router.navigate(['/']);
    }
  }

}



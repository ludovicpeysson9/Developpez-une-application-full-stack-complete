import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * RegistrationComponent is responsible for handling user registration.
 * It manages the registration form and handles the registration process.
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isMobile: boolean = false;
  isTablet: boolean = false;

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private router: Router, private snackBar: MatSnackBar) { }

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
 * Handles the registration form submission.
 */
  onSubmit() {
    if (!this.isValidPassword(this.password)) {
      this.snackBar.open('Le mot de passe doit contenir au moins 8 caractères, dont au moins 1 chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial.', 'Fermer', {
        duration: 4000,
      });
      return;
    }

    console.log('Sending registration data:', {
      username: this.username,
      email: this.email,
      password: this.password
    });

    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('access_token', response.token);

        this.router.navigate(['/articles']);
      },
      error => {
        console.error('Registration failed', error);
        this.snackBar.open('Registration Failed!', 'Fermer', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Validates the password.
   * @param password - The password to validate.
   * @returns A boolean indicating if the password is valid.
   */
  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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

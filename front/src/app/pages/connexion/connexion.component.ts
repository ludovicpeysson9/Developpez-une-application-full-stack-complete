import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 960px)' // Tablette
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });
  }

  onSubmit() {
    this.authService.login(this.identifier, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('access_token', response.token);

        console.log('Stored user_id:', localStorage.getItem('user_id'));
        console.log('Stored username:', localStorage.getItem('username'));
        console.log('Stored email:', localStorage.getItem('email'));
        console.log('Stored access_token:', localStorage.getItem('access_token'));

        this.router.navigate(['/articles']);
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    );
  }

  navigateToHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/articles']);
    } else {
      this.router.navigate(['/']);
    }
  }

}



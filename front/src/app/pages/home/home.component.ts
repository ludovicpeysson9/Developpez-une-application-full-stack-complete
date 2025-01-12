import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * HomeComponent is responsible for displaying the home page.
 * It provides navigation to the login and registration pages.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
 * Navigates to the login page.
 */
  navigateToConnexion() {
    this.router.navigate(['/connexion']);
  }

  /**
 * Navigates to the registration page.
 */
  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}

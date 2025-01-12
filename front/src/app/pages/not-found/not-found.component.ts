import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * NotFoundComponent is responsible for displaying the 404 Not Found page.
 * It provides navigation back to the home page.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
 * Navigates to the home page.
 */
  goToHome(): void {
    this.router.navigate(['/']);
  }

}

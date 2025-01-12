import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * RouteStateService is responsible for tracking the current URL state.
 * It provides methods to observe the current URL changes.
 */
@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private readonly currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('/');

  constructor(private readonly router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.next(event.urlAfterRedirects);
    });
  }

  /**
   * Returns an observable to observe current URL changes.
   * @returns An Observable of the current URL.
   */
  getCurrentUrl(): Observable<string> {
    return this.currentUrl.asObservable();
  }
}

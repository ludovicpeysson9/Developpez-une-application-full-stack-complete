import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private currentUrl = new BehaviorSubject<string>('/');

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.next(event.urlAfterRedirects);
    });
  }

  getCurrentUrl() {
    return this.currentUrl.asObservable();
  }
}

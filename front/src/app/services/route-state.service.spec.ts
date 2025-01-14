import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { RouteStateService } from './route-state.service';
import { BehaviorSubject } from 'rxjs';

describe('RouteStateService', () => {
  let service: RouteStateService;
  let router: Router;
  let mockRouterEvents: BehaviorSubject<any>;

  beforeEach(() => {
    mockRouterEvents = new BehaviorSubject<any>(null);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouteStateService,
        { provide: Router, useValue: { events: mockRouterEvents.asObservable() } }
      ]
    });

    service = TestBed.inject(RouteStateService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial URL', (done: DoneFn) => {
    service.getCurrentUrl().subscribe(url => {
      expect(url).toBe('/');
      done();
    });
  });

  it('should update the current URL on NavigationEnd event', (done: DoneFn) => {
    const newUrl = '/new-url';
    service.getCurrentUrl().subscribe(url => {
      if (url === newUrl) {
        expect(url).toBe(newUrl);
        done();
      }
    });

    mockRouterEvents.next(new NavigationEnd(1, newUrl, newUrl));
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppBarComponent } from './app-bar.component';
import { AuthService } from '../../services/auth.service';
import { RouteStateService } from 'src/app/services/route-state.service';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routeStateServiceSpy: jasmine.SpyObj<RouteStateService>;
  let router: Router;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routeStateSpy = jasmine.createSpyObj('RouteStateService', ['getCurrentUrl']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppBarComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: RouteStateService, useValue: routeStateSpy },
        BreakpointObserver
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routeStateServiceSpy = TestBed.inject(RouteStateService) as jasmine.SpyObj<RouteStateService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update showUserAvatar and showTabs based on current URL', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    routeStateServiceSpy.getCurrentUrl.and.returnValue(of('/myAccount'));
    component.ngOnInit();
    expect(component.isActiveAccountPage).toBeTrue();
    expect(component.showUserAvatar).toBeTrue();
    expect(component.showTabs).toBeTrue();
  });

  it('should toggle menu open and close', () => {
    component.menuOpen = false;
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should close menu when clicking outside', () => {
    component.menuOpen = true;
    (component as any).addGlobalClickListener();
    document.dispatchEvent(new Event('click'));
    expect(component.menuOpen).toBeFalse();
  });

  it('should navigate to home based on login status', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isLoggedIn = true;
    component.navigateToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/articles']);

    component.isLoggedIn = false;
    component.navigateToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const breakpointSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ConnexionComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;

    breakpointObserverSpy = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login', () => {
    const mockResponse = {
      id: '123',
      username: 'testuser',
      email: 'testuser@example.com',
      token: 'abc123',
    };

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.identifier = 'testuser';
    component.password = 'password';
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'password');
    expect(localStorage.getItem('user_id')).toBe(mockResponse.id);
    expect(localStorage.getItem('username')).toBe(mockResponse.username);
    expect(localStorage.getItem('email')).toBe(mockResponse.email);
    expect(localStorage.getItem('access_token')).toBe(mockResponse.token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
  });

  it('should handle failed login', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.identifier = 'wronguser';
    component.password = 'wrongpassword';
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('wronguser', 'wrongpassword');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Login Failed!', 'Fermer', {
      duration: 2000,
    });
  });

  it('should navigate to home if logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    component.navigateToHome();

    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
  });

  it('should navigate to root if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    component.navigateToHome();

    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});

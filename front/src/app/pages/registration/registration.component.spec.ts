import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { RegistrationComponent } from './registration.component';
import { AuthService } from 'src/app/services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const breakpointSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: BreakpointObserver, useValue: breakpointSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: MatSnackBar, useValue: snackSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    breakpointObserverSpy = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle registration form submission', () => {
    component.username = 'testuser';
    component.email = 'test@example.com';
    component.password = 'password123';

    authServiceSpy.register.and.returnValue(of({}));

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalledWith('testuser', 'test@example.com', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
  });
});
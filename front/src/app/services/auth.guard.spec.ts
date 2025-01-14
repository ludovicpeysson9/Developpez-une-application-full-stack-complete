import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
        const routerMock = jasmine.createSpyObj('Router', ['createUrlTree']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                AuthGuard,
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerMock },
            ],
        });

        authGuard = TestBed.inject(AuthGuard);
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('should allow access for unauthenticated users on public routes', () => {
        authServiceSpy.isLoggedIn.and.returnValue(false);

        const result = authGuard.canActivate(
            {} as ActivatedRouteSnapshot,
            { url: '/connexion' } as RouterStateSnapshot
        );

        expect(result).toBeTrue();
    });

    it('should redirect unauthenticated users to /connexion for protected routes', () => {
        authServiceSpy.isLoggedIn.and.returnValue(false);
        routerSpy.createUrlTree.and.returnValue({} as any);

        const result = authGuard.canActivate(
            {} as ActivatedRouteSnapshot,
            { url: '/protected' } as RouterStateSnapshot
        );

        expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/connexion']);
        expect(result).toEqual(routerSpy.createUrlTree.calls.mostRecent().returnValue);
    });

    it('should redirect authenticated users away from public routes', () => {
        authServiceSpy.isLoggedIn.and.returnValue(true);
        routerSpy.createUrlTree.and.returnValue({} as any);

        const result = authGuard.canActivate(
            {} as ActivatedRouteSnapshot,
            { url: '/connexion' } as RouterStateSnapshot
        );

        expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/myAccount']);
        expect(result).toEqual(routerSpy.createUrlTree.calls.mostRecent().returnValue);
    });

    it('should allow access for authenticated users on protected routes', () => {
        authServiceSpy.isLoggedIn.and.returnValue(true);

        const result = authGuard.canActivate(
            {} as ActivatedRouteSnapshot,
            { url: '/protected' } as RouterStateSnapshot
        );

        expect(result).toBeTrue();
    });
});

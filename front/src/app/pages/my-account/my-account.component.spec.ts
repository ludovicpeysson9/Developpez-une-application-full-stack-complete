import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account.component';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Theme } from 'src/app/models/theme.model';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const themeSpy = jasmine.createSpyObj('ThemeService', ['getUserThemes', 'unsubscribe']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserId', 'updateUser', 'logout']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [MyAccountComponent],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;

    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user subscriptions on init', () => {
    const mockThemes: Theme[] = [
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' },
    ];

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_id') return '1';
      return null;
    });

    themeServiceSpy.getUserThemes.and.returnValue(of(mockThemes));

    component.ngOnInit();

    expect(themeServiceSpy.getUserThemes).toHaveBeenCalledWith(1);
    expect(component.subscriptions).toEqual(mockThemes);
  });

  it('should show error when saving profile with missing data', () => {
    component.username = '';
    component.email = '';
    component.saveProfile();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Veuillez remplir tous les champs correctement.', 'Fermer', {
      duration: 2000,
    });
  });

  it('should log out successfully', () => {
    authServiceSpy.logout.and.callFake(() => { });
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Déconnexion réussie', 'Fermer', {
      duration: 2000,
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/connexion']);
  });

  it('should unsubscribe from a theme successfully', () => {
    const themeId = 1;
    const mockThemes: Theme[] = [
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' },
    ];

    spyOn(localStorage, 'getItem').and.callFake(() => '1');
    themeServiceSpy.unsubscribe.and.returnValue(of({}));
    component.subscriptions = mockThemes;

    component.unsubscribe(themeId);

    expect(themeServiceSpy.unsubscribe).toHaveBeenCalledWith(1, themeId);
    expect(component.subscriptions).toEqual([{ id: 2, title: 'Theme 2', content: 'Content 2' }]);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Désabonné avec succès', 'Fermer', {
      duration: 2000,
    });
  });

  it('should handle error when unsubscribing from a theme', () => {
    const themeId = 1;
    spyOn(localStorage, 'getItem').and.callFake(() => '1');
    themeServiceSpy.unsubscribe.and.returnValue(throwError(() => new Error('Erreur lors de la désinscription')));

    component.unsubscribe(themeId);

    expect(themeServiceSpy.unsubscribe).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Erreur lors de la désinscription', 'Fermer', {
      duration: 2000,
    });
  });
});

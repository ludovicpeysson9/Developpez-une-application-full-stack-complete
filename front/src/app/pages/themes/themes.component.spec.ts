import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemesComponent } from './themes.component';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    const themeSpy = jasmine.createSpyObj('ThemeService', ['getAllThemes', 'getUserThemes', 'subscribe', 'unsubscribe']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken', 'getUserId']);
    const snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ ThemesComponent ],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: MatSnackBar, useValue: snackBar },
      ],
      schemas: [NO_ERRORS_SCHEMA] // Pour ignorer les erreurs liées à la vue
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;

    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    breakpointObserverSpy = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    authServiceSpy.getUserId.and.returnValue('1');  // Simule l'utilisateur avec un ID "1"
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from a theme successfully', () => {
    component.userId = 1;
    component.userSubscriptions = [
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' }
    ];

    themeServiceSpy.unsubscribe.and.returnValue(of({}));

    component.unsubscribe(1);

    expect(themeServiceSpy.unsubscribe).toHaveBeenCalledWith(1, 1);
    expect(component.userSubscriptions).toEqual([{ id: 2, title: 'Theme 2', content: 'Content 2' }]);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Unsubscribed successfully', 'Close', { duration: 500 });
  });

  it('should handle error when unsubscribing from a theme', () => {
    component.userId = 1;
    component.userSubscriptions = [
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' }
    ];

    themeServiceSpy.unsubscribe.and.returnValue(throwError(() => new Error('Error unsubscribing from theme')));

    component.unsubscribe(1);

    expect(themeServiceSpy.unsubscribe).toHaveBeenCalledWith(1, 1);
    expect(component.userSubscriptions).toEqual([
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' }
    ]);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Error unsubscribing from theme', 'Close', { duration: 500 });
  });

  it('should load themes and subscriptions on init', () => {
    const themes = [{ id: 1, title: 'Theme 1', content: 'Content' }];
    const subscriptions = [{ id: 1, title: 'Theme 1', content: 'Content' }];

    themeServiceSpy.getAllThemes.and.returnValue(of(themes));
    themeServiceSpy.getUserThemes.and.returnValue(of(subscriptions));

    component.ngOnInit();

    expect(component.themes).toEqual(themes); // Vérifier que les thèmes sont chargés
    expect(component.userSubscriptions).toEqual(subscriptions); // Vérifier que les abonnements sont chargés
  });

  it('should correctly identify if user is subscribed to a theme', () => {
    const themeId = 1;
    const theme = { id: themeId, title: 'Theme 1', content: 'Content' };

    component.userSubscriptions = [theme];

    expect(component.isSubscribed(themeId)).toBeTrue(); // Vérifier si l'utilisateur est abonné
  });

  it('should correctly identify if user is not subscribed to a theme', () => {
    const themeId = 1;

    component.userSubscriptions = [];

    expect(component.isSubscribed(themeId)).toBeFalse(); // Vérifier si l'utilisateur n'est pas abonné
  });
});

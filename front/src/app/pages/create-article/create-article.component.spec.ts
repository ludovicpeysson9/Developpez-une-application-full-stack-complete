import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleComponent } from './create-article.component';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Theme } from 'src/app/models/theme.model';
import { Article, ArticleInput } from 'src/app/models/article.model';
import { FormsModule } from '@angular/forms';

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const themeSpy = jasmine.createSpyObj('ThemeService', ['getAllThemes']);
    const articleSpy = jasmine.createSpyObj('ArticleService', ['createArticle']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserId']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      imports: [
        FormsModule, // Nécessaire pour [(ngModel)]
        MatSnackBarModule, // Nécessaire pour MatSnackBar
      ],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: ArticleService, useValue: articleSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;

    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load themes on init', () => {
    const mockThemes: Theme[] = [
      { id: 1, title: 'Theme 1', content: 'Content 1' },
      { id: 2, title: 'Theme 2', content: 'Content 2' },
    ];
    themeServiceSpy.getAllThemes.and.returnValue(of(mockThemes));

    component.ngOnInit();

    expect(themeServiceSpy.getAllThemes).toHaveBeenCalled();
    expect(component.themes).toEqual(mockThemes);
  });

  it('should show error if theme is not selected', () => {
    component.title = 'Test Title';
    component.content = 'Test Content';
    component.authorId = 1;
    component.themeId = undefined;

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Veuillez sélectionner un thème.', 'Fermer', {
      duration: 2000,
    });
  });

  it('should show error if fields are missing', () => {
    component.themeId = 1;
    component.title = '';
    component.content = '';
    component.authorId = 1;

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Veuillez remplir tous les champs du formulaire.', 'Fermer', {
      duration: 2000,
    });
  });

  it('should create article successfully', () => {
    const mockArticle: Article = {
      id: 1,
      title: 'Test Title',
      content: 'Test Content',
      authorId: 1,
      themeId: 1,
      themeTitle: 'Theme 1',
      date: '2023-01-01',
      articleAuthor: 'Author 1',
    };

    articleServiceSpy.createArticle.and.returnValue(of(mockArticle));

    component.themeId = 1;
    component.title = 'Test Title';
    component.content = 'Test Content';
    component.authorId = 1;

    component.onSubmit();

    const expectedArticleInput: ArticleInput = {
      title: 'Test Title',
      content: 'Test Content',
      authorId: 1,
      themeId: 1,
    };

    expect(articleServiceSpy.createArticle).toHaveBeenCalledWith(expectedArticleInput);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Article créé avec succès', 'Fermer', {
      duration: 2000,
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/article/${mockArticle.id}`]);
  });

  it('should handle error when creating article', () => {
    articleServiceSpy.createArticle.and.returnValue(
      throwError(() => new Error('Erreur lors de la création de l\'article'))
    );

    component.themeId = 1;
    component.title = 'Test Title';
    component.content = 'Test Content';
    component.authorId = 1;

    component.onSubmit();

    expect(articleServiceSpy.createArticle).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Erreur lors de la création de l\'article', 'Fermer', {
      duration: 2000,
    });
  });
});

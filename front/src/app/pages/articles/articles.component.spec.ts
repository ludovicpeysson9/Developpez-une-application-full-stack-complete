import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from 'src/app/services/article.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article.model';
import { Theme } from 'src/app/models/theme.model';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const articleSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    const themeSpy = jasmine.createSpyObj('ThemeService', ['getUserThemes']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserId']);
  
    articleSpy.getArticles.and.returnValue(of([])); 
    themeSpy.getUserThemes.and.returnValue(of([])); 
    authSpy.getUserId.and.returnValue('1');
  
    await TestBed.configureTestingModule({
      declarations: [ArticlesComponent],
      providers: [
        { provide: ArticleService, useValue: articleSpy },
        { provide: ThemeService, useValue: themeSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
  
    // Assigner les espions
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    const mockArticles: Article[] = [
      { id: 1, title: 'Test Article 1', content: 'Content 1', authorId: 1, themeId: 1, themeTitle: 'Theme 1', date: '2023-01-01', articleAuthor: 'Author 1' },
      { id: 2, title: 'Test Article 2', content: 'Content 2', authorId: 2, themeId: 2, themeTitle: 'Theme 2', date: '2023-01-02', articleAuthor: 'Author 2' }
    ];
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));

    component.ngOnInit();

    expect(articleServiceSpy.getArticles).toHaveBeenCalled();
    expect(component.articles).toEqual(mockArticles);
  });

  it('should load user themes if user is logged in', () => {
    const mockThemes: Theme[] = [
      { id: 1, title: 'Theme 1', content: 'content1' },
      { id: 2, title: 'Theme 2', content: 'content2' }
    ];
    authServiceSpy.getUserId.and.returnValue('1');
    themeServiceSpy.getUserThemes.and.returnValue(of(mockThemes));

    component.ngOnInit();

    expect(themeServiceSpy.getUserThemes).toHaveBeenCalledWith(1);
    expect(component.userSubscriptions).toEqual(mockThemes);
  });

  it('should handle error when fetching user themes', () => {
    authServiceSpy.getUserId.and.returnValue('1');
    themeServiceSpy.getUserThemes.and.returnValue(throwError(() => new Error('Error fetching user themes')));

    component.ngOnInit();

    expect(themeServiceSpy.getUserThemes).toHaveBeenCalledWith(1);
    expect(component.userSubscriptions).toEqual([]);
  });

  it('should sort articles by date in ascending order', () => {
    component.articles = [
      { id: 1, title: 'Article 1', content: '', authorId: 1, themeId: 1, themeTitle: '', date: '2023-01-02', articleAuthor: '' },
      { id: 2, title: 'Article 2', content: '', authorId: 1, themeId: 1, themeTitle: '', date: '2023-01-01', articleAuthor: '' }
    ];
    
    component.sortType = 'dateAsc';
    component.sortArticles();
  
    expect(component.sortedArticles[0].date).toBe('2023-01-01');
  });

  it('should set userSubscriptions to an empty array if userId is not valid', () => {
    authServiceSpy.getUserId.and.returnValue(null);
  
    component.ngOnInit();
  
    expect(component.userSubscriptions).toEqual([]);
  });

});
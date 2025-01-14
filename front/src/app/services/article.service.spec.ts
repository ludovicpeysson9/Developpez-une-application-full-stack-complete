import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Article, ArticleInput } from '../models/article.model';
import { throwError } from 'rxjs';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Test Article',
      content: 'This is a test article.',
      authorId: 1,
      themeId: 1,
      themeTitle: 'Test Theme',
      date: '2023-01-01',
      articleAuthor: 'Author1',
    },
    {
      id: 2,
      title: 'Another Test Article',
      content: 'This is another test article.',
      authorId: 2,
      themeId: 2,
      themeTitle: 'Another Theme',
      date: '2023-01-02',
      articleAuthor: 'Author2',
    },
  ];

  const mockArticleInput: ArticleInput = {
    title: 'New Article',
    content: 'Content of the new article.',
    authorId: 1,
    themeId: 1,
  };

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ArticleService,
        { provide: AuthService, useValue: authSpy },
      ],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all articles', () => {
    service.getArticles().subscribe((articles) => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(mockArticles);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/articles');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles);
  });

  it('should fetch an article by ID', () => {
    const mockArticle = mockArticles[0];
    const id = 1;

    service.getArticleById(id).subscribe((article) => {
      expect(article).toEqual(mockArticle);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/articles/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticle);
  });

  it('should create an article', () => {
    const mockToken = 'fake-token';
    const createdArticle = {
      ...mockArticleInput,
      id: 3,
      date: '2023-01-03',
      articleAuthor: 'Author1',
      themeTitle: 'Test Theme',
    };

    authServiceSpy.getToken.and.returnValue(mockToken);

    service.createArticle(mockArticleInput).subscribe((article) => {
      expect(article).toEqual(createdArticle);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/articles/createArticle');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(createdArticle);
  });

  it('should handle HTTP errors (getArticles)', () => {
    spyOn(service, 'getArticles').and.returnValue(
      throwError(() =>
        new HttpErrorResponse({
          status: 500,
          statusText: 'Server Error',
          error: 'Something went wrong',
        })
      )
    );

    service.getArticles().subscribe(
      () => fail('expected an error, not articles'),
      (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
        expect(error.error).toBe('Something went wrong');
      }
    );
  });

  it('should handle HTTP errors (createArticle)', () => {
    spyOn(service, 'createArticle').and.returnValue(
      throwError(() =>
        new HttpErrorResponse({
          status: 500,
          statusText: 'Server Error',
          error: 'Something went wrong',
        })
      )
    );

    service.createArticle(mockArticleInput).subscribe(
      () => fail('expected an error, not an article'),
      (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
        expect(error.error).toBe('Something went wrong');
      }
    );
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { Article } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comment.model';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;
  let router: Router;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const articleSpy = jasmine.createSpyObj('ArticleService', ['getArticleById']);
    const commentSpy = jasmine.createSpyObj('CommentService', ['getCommentsByArticleId', 'createComment']);

    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => '1',
        has: (key: string) => true,
        getAll: (key: string) => ['1'],
        keys: ['id']
      } as any)
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: articleSpy },
        { provide: CommentService, useValue: commentSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    commentServiceSpy = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load article and comments on init', () => {
    const mockArticle: Article = { id: 1, title: 'Test Article', content: 'Content', authorId: 1, themeId: 1, themeTitle: 'Theme', date: '2023-01-01', articleAuthor: 'Author' };
    const mockComments: Comment[] = [
      { id: 1, content: 'Test Comment 1', ownerId: 1, ownerUsername: 'User1', articleId: 1, date: '2023-01-01T12:00:00Z' },
      { id: 2, content: 'Test Comment 2', ownerId: 2, ownerUsername: 'User2', articleId: 1, date: '2023-01-02T12:00:00Z' }
    ];

    articleServiceSpy.getArticleById.and.returnValue(of(mockArticle));
    commentServiceSpy.getCommentsByArticleId.and.returnValue(of(mockComments));

    component.ngOnInit();

    expect(articleServiceSpy.getArticleById).toHaveBeenCalledWith(1);
    expect(commentServiceSpy.getCommentsByArticleId).toHaveBeenCalledWith(1);
    expect(component.article).toEqual(mockArticle);
    expect(component.comments).toEqual(mockComments);
  });

  afterEach(() => {
    // Ensure that all observables are unsubscribed
    fixture.destroy();
  });
});
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from './app-routing.module';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { MockAuthGuard } from './mock-auth.guard';

describe('AppRoutingModule', () => {
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'connexion', component: ConnexionComponent, canActivate: [MockAuthGuard] },
                    { path: 'article/:id', component: ArticleDetailComponent, canActivate: [MockAuthGuard] },
                    { path: 'createArticle', component: CreateArticleComponent, canActivate: [MockAuthGuard] },
                    { path: 'articles', component: ArticlesComponent, canActivate: [MockAuthGuard] },
                    { path: 'themes', component: ThemesComponent, canActivate: [MockAuthGuard] },
                    { path: 'myAccount', component: MyAccountComponent, canActivate: [MockAuthGuard] },
                    { path: '**', component: NotFoundComponent },
                ]),
                HttpClientTestingModule
            ],
            declarations: [
                ConnexionComponent,
                ArticleDetailComponent,
                CreateArticleComponent,
                ArticlesComponent,
                ThemesComponent,
                MyAccountComponent,
                NotFoundComponent
            ],
            providers: [
                { provide: AuthGuard, useClass: MockAuthGuard },
                AuthService
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
    });

    it('should navigate to "" redirects you to /', async () => {
        await router.navigate(['/']);
        expect(location.path()).toBe('/');
    });

    it('should navigate to "connexion" redirects you to /connexion', async () => {
        await router.navigate(['/connexion']);
        expect(location.path()).toBe('/connexion');
    });

    it('should navigate to "registration" redirects you to /registration', async () => {
        await router.navigate(['/registration']);
        expect(location.path()).toBe('/registration');
    });

    it('should navigate to "article/:id" redirects you to /article/1', async () => {
        await router.navigate(['/article/1']);
        expect(location.path()).toBe('/article/1');
    });

    it('should navigate to "createArticle" redirects you to /createArticle', async () => {
        await router.navigate(['/createArticle']);
        expect(location.path()).toBe('/createArticle');
    });

    it('should navigate to "articles" redirects you to /articles', async () => {
        await router.navigate(['/articles']);
        expect(location.path()).toBe('/articles');
    });

    it('should navigate to "themes" redirects you to /themes', async () => {
        await router.navigate(['/themes']);
        expect(location.path()).toBe('/themes');
    });

    it('should navigate to "myAccount" redirects you to /myAccount', async () => {
        await router.navigate(['/myAccount']);
        expect(location.path()).toBe('/myAccount');
    });

    it('should navigate to "**" redirects you to /not-found', async () => {
        await router.navigate(['/not-found']);
        expect(location.path()).toBe('/not-found');
    });
});
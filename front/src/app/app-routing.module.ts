import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


import { AuthGuard } from './services/auth.guard';

/**
 * Application routes configuration.
 * The routes array defines the mapping between URL paths and components.
 * The AuthGuard is used to protect routes from unauthorized access.
 */
const routes: Routes = [
  { path: '', component: HomeComponent, 
    canActivate: [AuthGuard] }, 
  { path: 'registration', component: RegistrationComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'connexion', component: ConnexionComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'article/:id', component: ArticleDetailComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'createArticle', component: CreateArticleComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'articles', component: ArticlesComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'themes', component: ThemesComponent,
    canActivate: [AuthGuard]
  },
  { path: 'myAccount', component: MyAccountComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent },
];

/**
 * AppRoutingModule is responsible for providing the routing configuration
 * for the application. It imports the RouterModule and applies the routes
 * defined in the routes array.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

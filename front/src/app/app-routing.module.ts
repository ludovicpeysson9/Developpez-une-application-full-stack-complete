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

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

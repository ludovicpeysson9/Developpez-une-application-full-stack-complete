import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { AuthGuard } from './services/auth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'registration', component: RegistrationComponent },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'articles', component: ArticlesComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

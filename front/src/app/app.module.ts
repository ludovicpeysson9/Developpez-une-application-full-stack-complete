import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ArticlesComponent } from './pages/articles/articles.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, RegistrationComponent, AppBarComponent, ConnexionComponent, ArticlesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

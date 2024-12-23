import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Theme } from './../models/theme.model'

@Injectable({
  providedIn: 'root'
})
export class ThemeService { // A remplacer par liste tirée de BDD, unique 
  private themes: Theme[] = [
    {id:'1', name:'Java', content: 'Tout ce qu\'il y a a savoir sur le Java'},
    {id:'1', name:'JavaScript' , content: 'Tout ce qu\'il y a a savoir sur le JavaScript'},
    {id:'1', name:'Python' , content: 'Tout ce qu\'il y a a savoir sur le Python'},
    {id:'1', name:'C#' , content: 'Tout ce qu\'il y a a savoir sur le C#'},
    {id:'1', name:'Rust', content: 'Tout ce qu\'il y a a savoir sur le Rust'},
  ];

  constructor() { }

  // Récupère tous les articles
  getThemes(): Observable<Theme[]> {
    return of(this.themes);
  }

  // Récupère un article par ID
  getThemeById(id: string): Observable<Theme | undefined> {
    const theme = this.themes.find(theme => theme.id === id);
    return of(theme);
  }
}

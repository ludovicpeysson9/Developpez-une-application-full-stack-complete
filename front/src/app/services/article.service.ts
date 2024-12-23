import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './../models/article.model'

@Injectable({
  providedIn: 'root'
})
export class ArticleService { // A remplacer par liste tirée de BDD
  private articles: Article[] = [
    { id: '1', title: 'Titre de l’article 1', date: '01/12/2024', author: 'Auteur 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.', theme: 'Java' },
    { id: '2', title: 'Titre de l’article 2', date: '02/12/2024', author: 'Auteur 2', content: 'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.', theme: 'Python' },
    { id: '3', title: 'Titre de l’article 3', date: '03/12/2024', author: 'Auteur 3', content: 'Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.', theme: 'C#' },
    { id: '4', title: 'Exploration des nouvelles technologies', date: '05/12/2024', author: 'Auteur 1', content: 'Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.', theme: 'JavaScript' },
    { id: '5', title: 'La conservation de la nature et son importance', date: '06/12/2024', author: 'Auteur 2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', theme: 'Java' },
    { id: '6', title: 'Avancées en intelligence artificielle', date: '07/12/2024', author: 'Auteur 3', content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', theme: 'Java' },
    { id: '7', title: 'Le futur de l\'énergie durable', date: '08/12/2024', author: 'Auteur 1', content: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', theme: 'Rust' },
    { id: '8', title: 'Les mystères de l\'espace explorés', date: '09/12/2024', author: 'Auteur 2', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', theme: 'JavaScript' },
    { id: '9', title: 'Progrès dans les biotechnologies', date: '10/12/2024', author: 'Auteur 3', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', theme: 'Python' },
    { id: '10', title: 'L\'art moderne et la société', date: '11/12/2024', author: 'Auteur 1', content: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', theme: '' }
  ];

  constructor() { }

  // Récupère tous les articles
  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  // Récupère un article par ID
  getArticleById(id: string): Observable<Article | undefined> {
    const article = this.articles.find(article => article.id === id);
    return of(article);
  }
}

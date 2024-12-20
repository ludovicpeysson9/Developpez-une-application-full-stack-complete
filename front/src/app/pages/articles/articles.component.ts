import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  isMobile: boolean = false;
  isTablet: boolean = false;  

  // Exemple de données pour les articles
  articles = [
    {
      title: 'Titre de l’article 1',
      date: '01/12/2024',
      author: 'Auteur 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a lorem ut sem hendrerit fringilla. Duis non elit metus. Fusce tincidunt purus non velit tincidunt, nec molestie risus feugiat.,consectetur adipiscing elit. Proin a lorem ut sem hendrerit fringilla. Duis non elit metus. Fusce tincidunt purus non velit tincidunt, nec molestie risus feugiat.'
    },
    {
      title: 'Titre de l’article 2',
      date: '02/12/2024',
      author: 'Auteur 2',
      content:
        'Praesent condimentum lorem nec sem ultricies, vitae tincidunt elit consequat. Nullam interdum, magna in volutpat laoreet, nulla ligula congue lorem, ut consectetur magna lorem nec ligula.'
    },
    {
      title: 'Titre de l’article 3',
      date: '03/12/2024',
      author: 'Auteur 3',
      content:
        'Fusce faucibus purus quis nisl aliquam, ac consequat odio hendrerit. Suspendisse non neque a metus vehicula congue at nec magna. Nulla id felis ut velit auctor tincidunt.  faucibus purus quis nisl aliquam, ac consequat odio hendrerit. Suspendisse non neque a metus vehicula congue at nec magna. Nulla id felis ut velit auctor tincidunt.'
    },
    {
      title: 'Titre de l’article 2',
      date: '02/12/2024',
      author: 'Auteur 2',
      content:
        'Praesent condimentum lorem nec sem ultricies, vitae tincidunt elit consequat. Nullam interdum, magna in volutpat laoreet, nulla ligula congue lorem, ut consectetur magna lorem nec ligula.'
    },
    {
      title: 'Titre de l’article 2',
      date: '02/12/2024',
      author: 'Auteur 2',
      content:
        'Praesent condimentum lorem nec sem ultricies, vitae tincidunt elit consequat.  faucibus purus quis nisl aliquam, ac consequat odio hendrerit. Suspendisse non neque a metus vehicula congue at nec magna. Nulla id felis ut velit auctor tincidunt.Nullam interdum, magna in volutpat laoreet, nulla ligula congue lorem, ut consectetur magna lorem nec ligula.'
    },
    {
      title: 'Titre de l’article 2',
      date: '02/12/2024',
      author: 'Auteur 2',
      content:
        'Praesent condimentum lorem nec sem ultricies, vitae tincidunt elit consequat. Nullam interdum, magna in volutpat laoreet, nulla ligula congue lorem, ut consectetur magna lorem nec ligula.'
    },
    {
      title: 'Titre de l’article 2',
      date: '02/12/2024',
      author: 'Auteur 2',
      content:
        'Praesent condimentum lorem nec sem ultricies, vitae tincidunt elit consequat. Nullam interdum, magna in volutpat laoreet, nulla ligula congue lorem, ut consectetur magna lorem nec ligula.'
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 960px)' // Tablette
    ]).subscribe(result => {
      this.isMobile = result.breakpoints['(max-width: 768px)'] || false;
      this.isTablet = result.breakpoints['(min-width: 769px) and (max-width: 960px)'] || false;
    });

  }
}

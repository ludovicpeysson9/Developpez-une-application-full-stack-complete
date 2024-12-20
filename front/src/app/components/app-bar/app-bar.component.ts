import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  activeTab: string = 'articles'; // Définir l'onglet actif par défaut

  constructor() {}

  ngOnInit(): void {}

  // Méthode pour changer l'onglet actif
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    console.log("this.activeTab : ",  this.activeTab);
  }
}

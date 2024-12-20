import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ScreenService } from '../../services/screen.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isMobile: boolean = false;
  isTablet: boolean = false;

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

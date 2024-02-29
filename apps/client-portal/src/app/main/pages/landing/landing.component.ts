import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'monita-platform-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Apps',
        items: [
          {
            label: 'Budgeting App',
            routerLink: '/auth/budgeting/login',
          },
          {
            label: 'Bureau App',
            routerLink: '/auth/bureau/login',
          },
          {
            label: 'MDA App',
            routerLink: '/auth/mda/login',
          },
        ]
      },
    ];
  }
}

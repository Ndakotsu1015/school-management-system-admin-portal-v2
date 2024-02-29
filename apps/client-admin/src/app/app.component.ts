import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { AppState } from './store/app.state';
import { appLoadingDefaultState } from './store/loading/loading.reducer';
import { AppLayoutService } from './shared/services/app-layout.service';

@Component({
  selector: 'hacienda-platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  documentBlocked: boolean;
  documentBlockedMessage: string | null;

  appLoadingEvents$ = this.appStore.select(state => state.loading);

  constructor(
    private readonly primeConfig: PrimeNGConfig,
    private readonly appStore: Store<AppState>,
    private layoutService: AppLayoutService,
  ) {
    this.documentBlocked = appLoadingDefaultState.state;
    this.documentBlockedMessage = appLoadingDefaultState.label;
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;

    this.appLoadingEvents$
      .subscribe({
        next: (state) => {
          this.documentBlocked = state.state;
          this.documentBlockedMessage = state.label;
        },
        error: (error) => {
          this.documentBlocked = appLoadingDefaultState.state;
          this.documentBlockedMessage = appLoadingDefaultState.label;
        },
      });

      const scale = 12;
      //optional configuration with the default configuration
      this.layoutService.config = {
        ripple: false,                      //toggles ripple on and off
        inputStyle: 'outlined',             //default style for input elements
        menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
        colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
        theme: 'lara-light-indigo',         //default component theme for PrimeNG
        scale: scale                           //size of the body font size to scale the whole application
      };
  
      document.documentElement.style.fontSize = scale + 'px';
  }
}

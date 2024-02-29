import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
// import { AppLayoutService } from './main/layout/services/app-layout.service';
// import { AppState } from './store/app.state';

@Component({
  selector: 'inventory-platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // appLoadingEvents$ = this.appStore.select(state => state.loading);

  constructor(
    private readonly primengConfig: PrimeNGConfig,
    // private readonly appStore: Store<AppState>,
    // private layoutService: AppLayoutService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;       //enables core ripple functionality

    const scale = 12;
    //optional configuration with the default configuration
    // this.layoutService.config = {
    //   ripple: false,                      //toggles ripple on and off
    //   inputStyle: 'outlined',             //default style for input elements
    //   menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
    //   colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
    //   theme: 'lara-light-indigo',         //default component theme for PrimeNG
    //   scale: scale                           //size of the body font size to scale the whole application
    // };

    document.documentElement.style.fontSize = scale + 'px';
  }

}

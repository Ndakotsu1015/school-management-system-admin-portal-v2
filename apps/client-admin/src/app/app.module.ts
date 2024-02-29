import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EndpointsModule } from '@hacienda-platform/endpoints';
import { UiModule } from '@hacienda-platform/ui';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducer } from './store/app.reducer';
import { AppState } from './store/app.state';
import { AppNotificationEffect } from './store/notification/app-notification.effect';
import { httpInterceptorProviders } from './api/interceptors/interceptors';
import { MeasuringUnitComponent } from './main/module/settings/pages/measuring-unit/measuring-unit.component';

@NgModule({
  declarations: [AppComponent, MeasuringUnitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiModule,
    EndpointsModule,
    StoreModule.forRoot<AppState>(appReducer),
    EffectsModule.forRoot([AppNotificationEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [...httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }

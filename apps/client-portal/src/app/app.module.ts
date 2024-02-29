import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { appReducer } from './main/store/app.reducer';
// import { AppNotificationEffect } from './main/store/notification/app-notification.effect';
// import { AppState } from './main/store/app.state';

import { UiModule } from '@nti-idcard-platform/ui';
import { LandingComponent } from './main/pages/landing/landing.component';
import { AccessDeniedComponent } from './main/pages/access-denied/access-denied.component';
import { AppLayoutModule } from './main/layout/app-layout.module';
import { AppState } from './store/app.state';
import { appReducer } from './store/app.reducer';
import { IdCardsPrintPageComponent } from './main/pages/id-cards-print-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AccessDeniedComponent,
    IdCardsPrintPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular4PaystackModule.forRoot('pk_test_xxxxxxxxxxxxxxxxxxxxxxxx')
    StoreModule.forRoot<AppState>(appReducer),
    // EffectsModule.forRoot([AppNotificationEffect]),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production,
    //   autoPause: true,
    // }),
    UiModule,
    AppRoutingModule,
    AppLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

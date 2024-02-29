import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@nti-idcard-platform/ui';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    UiModule,
    CommonModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
  ],
  // providers: [...httpInterceptorProviders]
})
export class AuthModule { }

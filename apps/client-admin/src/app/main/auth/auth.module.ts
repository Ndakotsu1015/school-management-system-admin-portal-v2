import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { UiModule } from '@hacienda-platform/ui';
import { ForgotPasswordStartComponent } from './pages/forgot-password-start/forgot-password-start.component';
import { ForgotPasswordEndComponent } from './pages/forgot-password-end/forgot-password-end.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPasswordStartComponent,
    ForgotPasswordEndComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    UiModule,
  ],
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordEndComponent } from './pages/forgot-password-end/forgot-password-end.component';
import { ForgotPasswordStartComponent } from './pages/forgot-password-start/forgot-password-start.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPasswordEndResolver } from './pages/resolvers/forgot-password-end.resolver';

const expiredTokenMessage: any =
  'The recovery link you selected has expired. Re-submit your email address to receive a new recovery link';
const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordStartComponent
  },
  {
    path: 'forgot-password/expired-token',
    component: ForgotPasswordStartComponent,
    data: { message: expiredTokenMessage }
  },
  {
    path: 'reset-password/:token/:email',
    component: ForgotPasswordEndComponent,
    resolve: { records: ForgotPasswordEndResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

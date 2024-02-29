import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './main/auth/helper/auth-guard.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./main/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'm',
    loadChildren: () =>
      import('./main/module/module.module').then((m) => m.ModuleModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./main/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./main/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

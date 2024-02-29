import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { AppNotificationActions } from '../../../store/notification/notification.action';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  private isLoggedIn = false;

  /**
   *
   * @param {Router} _router
   * @param {AuthService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthService,
    private readonly appStore: Store<AppState>
  ) {
    this._authenticationService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      },
    });
  }

  //canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const islogin = this._authenticationService.isLoggedIn;
    if (this.isLoggedIn) {
      return true;
    }

    setTimeout(() => {
      this.appStore.dispatch(
        AppNotificationActions.error({
          title: 'Unauthorized access!',
          message: 'Login to access this route!',
        })
      );
    }, 2500);

    return this._router.navigate(['/auth/login']);
  }
}

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
import { AuthService } from './auth.service';
import { AppState } from '../../../store/app.state';
import { authSelectIsLoggedIn } from '../../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  isLoggedIn = false;
  isOnboard: any;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {
    this.store.select(authSelectIsLoggedIn).subscribe({
      next: (token) => {
        this.isLoggedIn = token ? true : false;
        console.log('IsLoggedIn from Vendor Interceptor', this.isLoggedIn)
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isLoggedIn) {
      return this.router.navigate(['/auth/login']);
    }

    return true;
  }

}

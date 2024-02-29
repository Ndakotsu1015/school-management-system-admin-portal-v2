import { Injectable } from '@angular/core';
import { AdminDtos, CommerceDtos } from '@hacienda-platform/api-interfaces';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthEndpoint } from '../../../api/endpoints/auth.endpoint';
import { AppState } from '../../../store/app.state';
import { AppAuthActions } from '../../../store/auth/auth.action';
import {
  authSelectIsLoggedIn,
  authSelectUser,
} from '../../../store/auth/auth.selectors';
import { AppNotificationActions } from '../../../store/notification/notification.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = this.appStore.select(authSelectIsLoggedIn);
  public user$ = this.appStore.select(authSelectUser);

  constructor(
    private readonly authEndpoint: AuthEndpoint,
    private readonly appStore: Store<AppState>
  ) {}

  login(payload: AdminDtos.AdminAuthLoginRequestDto) {
    return this.authEndpoint.login(payload).pipe(
      map((response) => {
        if (response && response.access_token) {
          this.appStore.dispatch(
            AppAuthActions.login({
              access_token: response.access_token,
              user: response.user,
            })
          );

          // Display welcome message!
          setTimeout(() => {
            this.appStore.dispatch(
              AppNotificationActions.success({
                title: `Welcome back, ${response.user.full_name}`,
                message: 'You have successfully logged in to Hacienda. Enjoy!',
              })
            );
          }, 2500);
        }

        return response;
      })
    );
  }

  logout() {
    this.appStore.dispatch(AppAuthActions.logout());
    setTimeout(() => {
      this.appStore.dispatch(
        AppNotificationActions.success({
          title: 'See you next time!',
          message: 'You have successfully logged out!!',
        })
      );
    }, 2500);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  get user(): Observable<AdminDtos.AdminAuthLoggedInUserDto | null> {
    return this.user$;
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  authSelectAssignedPermissions,
  authSelectIsLoggedIn,
  authSelectIsUserType,
  authSelectUser,
} from '../../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = this.appStore.select(authSelectIsLoggedIn);
  private _userType$ = this.appStore.select(authSelectIsUserType);
  public user$ = this.appStore.select(authSelectUser);
  private _assignedPermissions$ = this.appStore.select(
    authSelectAssignedPermissions
  );

  private _assignedPermissions: string[] = [];
  private _userType: string = '';

  constructor(private readonly appStore: Store<AppState>) {
    this._assignedPermissions$.subscribe({
      next: (permissions) => {
        this._assignedPermissions = permissions;
      },
    });

    this._userType$.subscribe({
      next: (userType) => {
        this._userType = userType;
      },
    });
  }

  get user() {
    return this.user$;
  }
}

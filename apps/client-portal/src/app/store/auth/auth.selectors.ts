import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AppAuthState } from './auth.state';

export const authSelect = (state: AppState) => state.auth;

export const authSelectAccessToken = createSelector(
  authSelect,
  (state: AppAuthState) => state.access_token
);

export const authSelectIsLoggedIn = createSelector(
  authSelect,
  (state: AppAuthState) => state.access_token != null
);

export const authSelectIsUserType = createSelector(
  authSelect,
  (state: AppAuthState) => state.user_type ?? ''
);

export const authSelectIs = createSelector(
  authSelect,
  (state: AppAuthState) => state.access_token != null
);

export const authSelectUser = createSelector(
  authSelect,
  (state: AppAuthState) => state.user
);

export const authSelectAssignedPermissions = createSelector(
  authSelect,
  (state: AppAuthState) => state.user?.permissions ?? []
);

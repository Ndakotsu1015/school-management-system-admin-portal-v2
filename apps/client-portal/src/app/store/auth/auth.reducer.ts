import { AuthLoggedInUserDto } from '@nti-idcard-platform/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { AppAuthActions } from './auth.action';
import { AppAuthState } from './auth.state';

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'Inventory_access_token';
const LOCAL_STORAGE_KEY_USER = 'inventory_user';
const LOCAL_STORAGE_KEY_USER_TYPE = 'inventory_type';

function validateUserFromLocalStorage(o: any): o is AuthLoggedInUserDto {
  return (
    'uid' in o && 'staff_code' in o && 'full_name' in o && 'permissions' in o
  );
}

function getUserTypeFromLocalStorage(): string | null {
  const user_type = localStorage.getItem(LOCAL_STORAGE_KEY_USER_TYPE);
  return user_type;
}

function setUserTypeToLocalStorage(user_type: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_USER_TYPE, user_type);
}
function getAccessTokenFromLocalStorage(): string | null {
  const access_token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
  return access_token;
}

function setAccessTokenToLocalStorage(access_token: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, access_token);
}

function getUserFromLocalStorage(): AuthLoggedInUserDto | null {
  const serialized_user = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
  if (serialized_user) {
    const user = JSON.parse(serialized_user);
    if (validateUserFromLocalStorage(user)) {
      return user;
    }
  }
  return null;
}

function setUserToLocalStorage(user: AuthLoggedInUserDto): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
}

function removeUserTypeFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER_TYPE);
}
function removeAccessTokenFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
}

function removeUserFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

export const defaultAppAuthState: AppAuthState = {
  user_type: getUserTypeFromLocalStorage(),
  access_token: getAccessTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

export const appAuthReducer = createReducer<AppAuthState>(
  defaultAppAuthState,
  on(AppAuthActions.login, (state, props) => {
    setUserTypeToLocalStorage(props.user_type);
    setAccessTokenToLocalStorage(props.access_token);
    setUserToLocalStorage(props.user);
    return {
      user_type: props.user_type,
      access_token: props.access_token,
      user: props.user,
    };
  }),
  on(AppAuthActions.logout, (_) => {
    removeUserTypeFromLocalStorage();
    removeAccessTokenFromLocalStorage();
    removeUserFromLocalStorage();
    return {
      user_type: null,
      access_token: null,
      user: null,
    };
  })
);

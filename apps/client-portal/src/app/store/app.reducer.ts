import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { appLoadingReducer } from './loading/loading.reducer';
import { appNotificationReducer } from './notification/notification.reducer';
import { appAuthReducer } from './auth/auth.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  loading: appLoadingReducer,
  notification: appNotificationReducer,
  auth: appAuthReducer,
};

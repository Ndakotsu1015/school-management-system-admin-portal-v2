import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AdminUserResources } from '@hacienda-platform/api-interfaces';
import { UserEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<AdminUserResources.AdminUserResource[]> {
  constructor(
    private readonly appLoadingService: AppLoadingService,
    private readonly appNotificationService: AppNotificationService,
    private readonly userEndpoint: UserEndpoint,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUserResources.AdminUserResource[]> {

    this.appLoadingService.startLoading('Loading..');
    return this.userEndpoint.list().pipe(
      map((response) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Success',
          detail: 'Record was Successfully retrieved!!!'
        });
        return response;
      }),
      catchError((error, caught) => {
        this.appLoadingService.stopLoading();
        return caught;
      })
    );
  }
}

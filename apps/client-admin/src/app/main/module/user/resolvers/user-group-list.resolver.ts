import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AdminUserResources } from '@hacienda-platform/api-interfaces';
import { UserGroupEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user-group.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupListResolver implements Resolve<AdminUserResources.AdminUserGroupResource[]> {
  constructor(
    private readonly appLoadingService: AppLoadingService,
    private readonly appNotificationService: AppNotificationService,
    private readonly userGroupEndpoint: UserGroupEndpoint,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUserResources.AdminUserGroupResource[]> {
    this.appLoadingService.startLoading('Loading..');
    return this.userGroupEndpoint.list().pipe(
      map((response) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Success',
          detail: 'Records was Successfully retrieved!!!'
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

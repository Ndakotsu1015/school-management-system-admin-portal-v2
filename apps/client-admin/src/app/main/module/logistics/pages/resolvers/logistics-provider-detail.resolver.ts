import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { LogisticsResources } from "@hacienda-platform/api-interfaces";
import { LogisticsProviderEndpoint } from "apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint";
import { AppLoadingService } from "apps/client-admin/src/app/store/services/app-loading.service";
import { AppNotificationService } from "apps/client-admin/src/app/store/services/app-notification.service";
import { catchError, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LogisticsProviderDetailResolver implements Resolve<LogisticsResources.LogisticsProviderResource>{
  constructor(
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private logisticsProviderEndpoint: LogisticsProviderEndpoint,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const uid = route.params['uid'];
    this.appLoadingService.startLoading('loading . . .');

    return this.logisticsProviderEndpoint.findByUid(uid).pipe((map((response) => {
      this.appLoadingService.stopLoading();
      return response;
    })),
      catchError((error, caught) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showError({
          title: 'Error!!!',
          detail: 'Can not retrieve record',
        });
        return caught;
      })
    );
  }
}

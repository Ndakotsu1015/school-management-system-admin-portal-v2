import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { LogisticsResources } from "@hacienda-platform/api-interfaces";
import { LogisticsProviderEndpoint } from "apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint";
import { DeliveryOrderEndpoint } from "apps/client-admin/src/app/api/endpoints/order/delivery-order.endpoint";
import { AppLoadingService } from "apps/client-admin/src/app/store/services/app-loading.service";
import { AppNotificationService } from "apps/client-admin/src/app/store/services/app-notification.service";
import { DeliveryOrderResource } from "libs/api-interfaces/src/lib/resources/customer";
import { catchError, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DeliveryOrderDetailResolver implements Resolve<DeliveryOrderResource>{
  constructor(
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private deliveryOrderEndpoint: DeliveryOrderEndpoint,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const uid = route.params['uid'];
    this.appLoadingService.startLoading('loading . . .');

    return this.deliveryOrderEndpoint.findByUid(uid).pipe((map((response) => {
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

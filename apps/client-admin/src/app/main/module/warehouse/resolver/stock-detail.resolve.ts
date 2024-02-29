import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { WarehouseCommodityStockEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { WarehouseCommodityStockResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { catchError, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockDetailResolver
  implements Resolve<WarehouseCommodityStockResource>
{
  constructor(
    private readonly stockService: WarehouseCommodityStockEndpoint,
    private appLoading: AppLoadingService,
    private appNotification: AppNotificationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WarehouseCommodityStockResource> {
    const uid = route.params['uid'];

    this.appLoading.startLoading('Loading..');
    return this.stockService.findByUid(uid).pipe(
      map((response) => {
        this.appLoading.stopLoading();
        return response;
      }),
      catchError((error, caught) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
        return caught;
      })
    );
  }
}

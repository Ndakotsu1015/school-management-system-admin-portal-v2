import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { CustomerOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/customer-order.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CustomerOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { catchError, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerOrderResolver
  implements Resolve<CustomerOrderResource>
{
  constructor(
    private customerOrderEndpoint: CustomerOrderEndpoint,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CustomerOrderResource> {
    const uid = route.params['uid'];

    this.appLoadingService.startLoading('Loading..');
    return this.customerOrderEndpoint.findByUid(uid).pipe(
      map((response) => {
        this.appLoadingService.stopLoading();
        console.log(response)
        return response;
      }),
      catchError((error, caught) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
        return caught;
      })
    );
  }
}

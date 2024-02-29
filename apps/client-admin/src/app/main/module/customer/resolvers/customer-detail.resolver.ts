import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CustomerEndpoint } from 'apps/client-admin/src/app/api/endpoints/customer.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CustomerResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailResolver
  implements Resolve<CustomerResource>
{
  constructor(
    private readonly customerEndpoint: CustomerEndpoint,
    private appNotificationService: AppNotificationService,
    private appLoadingService: AppLoadingService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CustomerResource> {
    const uid = route.params['uid'];
    this.appLoadingService.startLoading('Loading..');
    return this.customerEndpoint.findByUid(uid).pipe(
      map((response) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Customer Details',
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

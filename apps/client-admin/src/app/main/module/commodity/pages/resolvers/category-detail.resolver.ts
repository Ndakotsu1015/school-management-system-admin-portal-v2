import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CommodityCategoryResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailResolver
  implements Resolve<CommodityCategoryResource>
{
  constructor(
    private categoryService: CommodityCategoryEndpoint,
    private appLoading: AppLoadingService,
    private appNotification: AppNotificationService
  ) {}

  // resolver(helper) this will help in collecting the activated route params and proccess
  //it before passing it to the page to subscribe...
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CommodityCategoryResource> {
    // assign uid to the collect route params
    const uid = route.params['uid'];

    // loading state of the process.
    this.appLoading.startLoading('Loading..');

    //finding the category with that uid passed by the route params
    //success and error handles with notification and
    // stoping the loading state when done with the process.
    return this.categoryService.findByUid(uid).pipe(
      map((response) => {
        this.appLoading.stopLoading();
        return response;
      }),
      catchError((error, caught) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error
        });
        return caught;
      })
    );
  }
}

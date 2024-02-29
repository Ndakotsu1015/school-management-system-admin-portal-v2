import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { VerifyTokenEndpoint } from 'apps/client-admin/src/app/api/endpoints/verify-token.endpoint';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordEndResolver
  implements Resolve<boolean>
{
  constructor(
    private appLoadingService: AppLoadingService,
    private verificationEndpoint: VerifyTokenEndpoint,
    private readonly router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const token = route.params['token'];
    const email = route.params['email'];
    this.appLoadingService.startLoading('Loading');

    return this.verificationEndpoint
      .verifyToken(token, email)
      .pipe(
        map((response) => {
          this.appLoadingService.stopLoading();
          return response;
        }),
        catchError((error, caught) => {
          this.appLoadingService.stopLoading();
          this.router.navigate([
            'auth/forgot-password/expired-token'
          ]);
          return caught;
        })
      );
  }
}

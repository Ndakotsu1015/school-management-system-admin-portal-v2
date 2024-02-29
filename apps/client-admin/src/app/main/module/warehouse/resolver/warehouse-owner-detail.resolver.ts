import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { WarehouseOwnerEndpoint } from "apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint";
import { AppLoadingService } from "apps/client-admin/src/app/store/services/app-loading.service";
import { AppNotificationService } from "apps/client-admin/src/app/store/services/app-notification.service";
import { WarehouseOwnerResource } from "libs/api-interfaces/src/lib/resources/warehouse";
import { catchError, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WarehouseOwnerDetailResolver implements Resolve<WarehouseOwnerResource>{
    constructor(
        private appLoadingService: AppLoadingService,
        private appNotificationService: AppNotificationService,
        private warehouseOwnerEndpoint: WarehouseOwnerEndpoint,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const uid = route.params['uid'];
        this.appLoadingService.startLoading('loading . . .');

        return this.warehouseOwnerEndpoint.findByUid(uid).pipe((map((response) => {
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

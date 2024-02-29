import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerEndpoint } from 'apps/client-admin/src/app/api/endpoints/customer.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { CustomerResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent implements OnInit {

  customers: CustomerResource[] = [];
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private readonly customerEndpoint: CustomerEndpoint,
    private readonly logger: LoggerService,
    private readonly router: Router,
    private appLoadingService: AppLoadingService,
  ) { }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of Customers',
      // routerLink: [
      //   '/m/warehouse/warehouse/commodity-stock/list'
      // ]
    });

    this.appLoadingService.startLoading('Loading');
    this.customerEndpoint.list()
      .subscribe({
        next: res => {
          this.appLoadingService.stopLoading();
          this.customers = res;

        },
        error: (error) => {
          this.appLoadingService.stopLoading();
          this.logger.logInfo("Could not fetch customer list");
          this.logger.logInfo(error);
        },
      });


  }

  showDetails(uid: string) {
    this.router.navigate(['/m/customer/customer/detail', uid]);
  }

  goBack(){
    window.history.back();
  }

}

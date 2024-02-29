import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CommodityCategoryResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './commodity-category-list-page.component.html',
  styleUrls: [
    './commodity-category-list-page.component.scss'
  ],
  providers: [ConfirmationService]
})
export class CommodityCategoryListPageComponent
  implements OnInit
{
  breadcrumbItems!: MenuItem[];
  loading = false;
  commodityCategories: CommodityCategoryResource[] = [];
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private appNotification: AppNotificationService,
    private appLoading: AppLoadingService,
    private route: Router,
    private categoryService: CommodityCategoryEndpoint,
    private logger: LoggerService,
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodity Category', routerLink: ['/m/commodity/variant/list'] });
    this.breadcrumbItems.push({ label: 'List' });
    this.primengConfig.ripple = true;
    // loading screen start
    this.appLoading.startLoading('Loading');

    //commodity category list is fetch and assign to commodityCategories for view.
    //and handling error to the user interface if any error occur.
    this.categoryService.list().subscribe({
      next: (response) => {
        this.commodityCategories = response;
        this.appLoading.stopLoading();
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.logger.logInfo(error);
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message
        });
      }
    });
  }

  // new category page button
  newPage() {
    this.route.navigate(['/m/commodity/category/new']);
  }

  //details page passing the route and the params
  detailPage(uid: string) {
    this.route.navigate([
      'm/commodity/category/detail/',
      uid
    ]);
  }

  //a button to clear all filter tags on all table fields
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  //global search, for quick access for records.
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  goBack() {
    window.history.back();
  }
}

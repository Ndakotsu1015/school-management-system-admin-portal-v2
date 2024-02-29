import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseCommodityStockEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { WarehouseCommodityStockResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './warehouse-commodity-stock-list-page.component.html',
  styleUrls: [
    './warehouse-commodity-stock-list-page.component.scss'
  ]
})
export class WarehouseCommodityStockListPageComponent
  implements OnInit
  
{
  loading = false;
  commodityStocks: WarehouseCommodityStockResource[] = [];
  breadcrumbItems!: MenuItem[];
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private appNotification: AppNotificationService,
    private appLoading: AppLoadingService,
    private logger: LoggerService,
    private stockService: WarehouseCommodityStockEndpoint,
    private route: Router,
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    // this.breadcrumbItems.push({ label: 'Commodity Stock List', routerLink: ['/m/warehouse/warehouse/owner'] });
    this.breadcrumbItems.push({ label: 'Commodity Stock List' });
    this.primengConfig.ripple = true;
    // this.appLoading.startLoading('Loading...');
    this.stockService.list().subscribe({
      next: (response) => {
        this.appLoading.stopLoading();
        this.commodityStocks = response;
        this.logger.logInfo(this.commodityStocks);
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail:
            'Failed to fetch commodity stocks from server.'
        });
      }
    });
  }

  newPage() {
    this.route.navigate([
      '/m/warehouse/warehouse/commodity-stock/new'
    ]);
  }

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

  detailPage(uid: string) {
    this.route.navigate([
      '/m/warehouse/warehouse/commodity-stock/detail',
      uid
    ]);
  }

  goBack() {
    window.history.back();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseCommodityStockEntryEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock-entry.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { WarehouseCommodityStockEntryResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './warehouse-commodity-stock-entry-list-page.component.html',
  styleUrls: [
    './warehouse-commodity-stock-entry-list-page.component.scss'
  ]
})
export class WarehouseCommodityStockEntryListPageComponent implements OnInit {
  commodityStockEntries: WarehouseCommodityStockEntryResource[] = [];
  breadcrumbItems!: MenuItem[];

  loading = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private readonly commodityStockEntryEndpoint: WarehouseCommodityStockEntryEndpoint,
    private appLoadindingService: AppLoadingService,
    private primengConfig: PrimeNGConfig,
    private appNotificationService: AppNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Commodity Stock Entry List'
    });

    this.commodityStockEntryEndpoint.list().subscribe({
      next: (response) => {
        this.commodityStockEntries = response;
        console.log('Response: ', response)
      },
      error: (error) => {
        console.log('Error:', error.error.message);
      }
    });
  }

  gotpNewPage() {
    return this.router.navigate(['/m/warehouse/warehouse/commodity-stock/entry/new']);
  }

  viewRecord(uid: string) {
    return this.router.navigate(['/m/warehouse/warehouse/commodity-stock/entry/detail', uid]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}

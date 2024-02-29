/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WarehouseResource } from './../../../../../../../../../libs/api-interfaces/src/lib/resources/warehouse';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { WarehouseEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse.endpoint';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'hacienda-platform-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
})
export class WarehouseListComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  warehouses: WarehouseResource[] = [];
  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private warehouseEndpoint: WarehouseEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,
  ) { }


  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Warehouses', routerLink: ['/m/warehouse/warehouse/list'] });
    this.breadcrumbItems.push({ label: 'List' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.warehouseEndpoint.list()
      .subscribe({
        next: (data) => {
          this.warehouses = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  showDetails(uid: string) {
    this.router.navigate(['/m/warehouse/warehouse/detail', uid]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  goBack() {
    window.history.back();
  }
}

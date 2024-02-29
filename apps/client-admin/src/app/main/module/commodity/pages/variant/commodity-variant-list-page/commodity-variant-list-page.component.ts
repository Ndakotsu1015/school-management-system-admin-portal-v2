/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { Table } from 'primeng/table';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { CommodityVariantResource } from 'libs/api-interfaces/src/lib/resources/commodity';

@Component({
  templateUrl: './commodity-variant-list-page.component.html',
  styleUrls: ['./commodity-variant-list-page.component.scss'],
})
export class CommodityVariantListPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  commodityVariants: CommodityVariantResource[] = [];
  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private commodityVariantEndpoint: CommodityVariantEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodity Variant', routerLink: ['/m/commodity/variant/list'] });
    this.breadcrumbItems.push({ label: 'List' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.commodityVariantEndpoint.list()
      .subscribe({
        next: (data) => {
          this.commodityVariants = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }


  showDetails(uid: string) {
    this.router.navigate(['/m/commodity/variant/detail', uid]);
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

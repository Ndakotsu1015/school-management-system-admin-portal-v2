import { CommodityEndpoint } from './../../../../../../api/endpoints/commodity/commodity.endpoint';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommodityResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './commodity-item-list-page.component.html',
  styleUrls: ['./commodity-item-list-page.component.scss'],
})
export class CommodityItemListPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  commodities: CommodityResource[] = [];
  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private commodityEndpoint: CommodityEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,
  ) {}


  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodities', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'List' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.commodityEndpoint.list()
      .subscribe({
        next: (data) => {
          this.commodities = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  showDetails(uid: string) {
    this.router.navigate(['/m/commodity/item/detail', uid]);
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

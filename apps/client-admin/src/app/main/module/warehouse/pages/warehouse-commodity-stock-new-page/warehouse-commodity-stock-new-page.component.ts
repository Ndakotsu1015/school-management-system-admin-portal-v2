import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { WarehouseCommodityStockEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock.endpoint';
import { WarehouseEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import {
  CommodityVariantResource
} from 'libs/api-interfaces/src/lib/resources/commodity';
import { WarehouseResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { CreateWarehouseCommodityStockDto } from 'libs/api-interfaces/src/lib/dtos/admin/inventory/index';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl:
    './warehouse-commodity-stock-new-page.component.html',
  styleUrls: [
    './warehouse-commodity-stock-new-page.component.scss'
  ]
})
export class WarehouseCommodityStockNewPageComponent
  implements OnInit {
  breadcrumbItems!: MenuItem[];
  stockForm: FormGroup;
  warehouseList!: WarehouseResource[];
  commodityVariantList!: CommodityVariantResource[];

  constructor(
    private appLoading: AppLoadingService,
    private appNotification: AppNotificationService,
    private primengConfig: PrimeNGConfig,
    private logger: LoggerService,
    private readonly stockService: WarehouseCommodityStockEndpoint,
    private fb: FormBuilder,
    private warehouseService: WarehouseEndpoint,
    private commodityVaService: CommodityVariantEndpoint,
    private route: Router
  ) {
    this.stockForm = this.fb.group({
      restockLevel: this.fb.control('', [
        Validators.required
      ]),
      holdingLevel: this.fb.control('', [
        Validators.required
      ]),
      warehouse: this.fb.control('', [Validators.required]),
      commodityVariant: this.fb.control('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of Commodity Stock',
      routerLink: [
        '/m/warehouse/warehouse/commodity-stock/list'
      ]
    });
    this.breadcrumbItems.push({ label: 'Add New' });
    this.primengConfig.ripple = true;

    this.appLoading.startLoading('Loading...');

    this.warehouseService.list().subscribe({
      next: (response) => {
        this.warehouseList = response;
        this.appLoading.stopLoading();
      },
      error: (error) => {
        this.appNotification.showError({
          title: 'Failed',
          detail: error
        });
        this.appLoading.stopLoading();
      }
    });

    this.commodityVaService.list().subscribe({
      next: (respones) => {
        this.commodityVariantList = respones;
        this.appLoading.stopLoading();
      },
      error: (error) => {
        this.appNotification.showError({
          title: 'Failed',
          detail: error
        });

        this.appLoading.stopLoading();
      }
    });
  }

  listPage() {
    this.route.navigate([
      '/m/warehouse/warehouse/commodity-stock/list'
    ]);
  }

  save() {
    const formData = this.stockForm.value;

    const payload: CreateWarehouseCommodityStockDto = {
      restock_target_level: formData.restockLevel,
      holding_target_level: formData.holdingLevel,
      warehouse_uid: formData.warehouse.uid,
      commodity_variant_uid: formData.commodityVariant.uid,
    };

    console.log(payload);

    this.appLoading.startLoading('Loading');
    this.stockService.create(payload).subscribe({
      next: (response) => {
        this.appLoading.stopLoading();
        this.appNotification.showSuccess({
          title: 'Success',
          detail:
            'Commodity stock was created successfully!'
        });
        this.route.navigate([
          '/m/warehouse/warehouse/commodity-stock/list'
        ]);
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
      }
    });
  }

  get fc() {
    return this.stockForm.controls;
  }

  goBack() {
    window.history.back();
  }
}

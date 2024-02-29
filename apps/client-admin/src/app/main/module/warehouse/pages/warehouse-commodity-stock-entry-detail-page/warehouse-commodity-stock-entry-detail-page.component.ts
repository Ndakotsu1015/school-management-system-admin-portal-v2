import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseCommodityStockEntryEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock-entry.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { E_WarehouseCommodityStockEntryType } from 'libs/api-interfaces/src/lib/dtos/admin';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  templateUrl:
    './warehouse-commodity-stock-entry-detail-page.component.html',
  styleUrls: ['./warehouse-commodity-stock-entry-detail-page.component.scss'
  ]
})
export class WarehouseCommodityStockEntryDetailPageComponent
  implements OnInit {
  commodityStockEntryForm: FormGroup;
  uid = '';
  types = [E_WarehouseCommodityStockEntryType.PURCHASE_ORDER, E_WarehouseCommodityStockEntryType.STOCK_TRANSFER]
  commodityStockEntries: any;//WarehouseCommodityStockEntryResource[] = [];
  commodityStocks = [];
  breadcrumbItems!: MenuItem[];

  operation = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private commodityStockEntryEndpoint: WarehouseCommodityStockEntryEndpoint
  ) {
    const item = new FormGroup({
      quantity_supplied: new FormControl(null, [Validators.required, Validators.min(1)]),
      unit_price: new FormControl(null, [Validators.required, Validators.min(1)]),
      commodity_stock_uid: new FormControl(null),
    })
    this.commodityStockEntryForm = this.fb.group({
      type: new FormControl(null, [Validators.required]),

      items: new FormArray([item]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Stock Management' });
    this.primengConfig.ripple = true;
    this.appLoadingService.startLoading('loading');
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.uid = params['uid'];
      }
    }
    );
  }

  get commodityStockEntryFormControls() {
    return this.commodityStockEntryForm.controls;
  }
  resetForm() {
    this.commodityStockEntryForm.reset();
    this.operation = '';
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.appLoadingService.startLoading('Loading...');
      this.commodityStockEntryEndpoint.update(this.uid, this.commodityStockEntries).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Commodity Stock',
            detail: 'Record was Successfully Updated'
          });
          this.resetForm();
        },
        error: (error) => {
          this.appLoadingService.stopLoading();
          this.operation = 'Edit';
          this.appNotificationService.showError({
            title: 'Oops',
            detail: error.error.message,
          });
        }
      });
    }
    else {
      this.operation = 'Edit';
    }
  }

  get commodityStockEntryFormItemsControls() {
    return (<FormArray>this.commodityStockEntryForm.controls['items']).controls;
  }

  addItemForm(quantity_supplied: number, unit_price: number, commodity_stock_uid: string) {
    const item = this.fb.group({
      quantity_supplied: new FormControl(quantity_supplied, [Validators.required, Validators.min(1)]),
      unit_price: new FormControl(unit_price, [Validators.required, Validators.min(1)]),
      commodity_stock_uid: new FormControl(commodity_stock_uid),
    });

    (<FormArray>this.commodityStockEntryFormControls['items']).push(item);
  }

  newItemForm() {
    const item = this.fb.group({
      quantity_supplied: new FormControl(null, [Validators.required, Validators.min(1)]),
      unit_price: new FormControl(null, [Validators.required, Validators.min(1)]),
      commodity_stock_uid: new FormControl(null),
    });

    (<FormArray>this.commodityStockEntryFormControls['items']).push(item);
  }

  get getLastIndex() {
    return this.commodityStockEntryFormItemsControls.length;
  }

  removeItemForm() {
    (<FormArray>this.commodityStockEntryFormControls['items']).removeAt(this.getLastIndex - 1);
  }

  preview() {
    this.operation = 'Update';
  }

  back() {
    window.history.back();
  }
  stepBack() {
    this.operation = '';
  }
}

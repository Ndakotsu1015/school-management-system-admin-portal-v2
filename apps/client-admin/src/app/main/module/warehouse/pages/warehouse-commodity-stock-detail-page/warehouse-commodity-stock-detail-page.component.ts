import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { imagePathPrefix } from 'apps/client-admin/src/app/api/endpoints/api';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { WarehouseCommodityStockEntryEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock-entry.endpoint';
import { WarehouseCommodityStockEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock.endpoint';
import { WarehouseEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { E_WarehouseCommodityStockEntryStatus, E_WarehouseCommodityStockEntryType, UpdateWarehouseCommodityStockDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import {
  CommodityVariantResource
} from 'libs/api-interfaces/src/lib/resources/commodity';
import {
  WarehouseCommodityStockEntryResource,
  WarehouseCommodityStockResource,
  WarehouseResource
} from 'libs/api-interfaces/src/lib/resources/warehouse';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './warehouse-commodity-stock-detail-page.component.html',
  styleUrls: [
    './warehouse-commodity-stock-detail-page.component.scss'
  ]
})
export class WarehouseCommodityStockDetailPageComponent
  implements OnInit {
  updateMode = false;
  stockUpdateForm: FormGroup;
  commodityStockEntryForm: FormGroup;
  uid = '';
  loading = false;
  stockByUid!: WarehouseCommodityStockResource;
  warehousesByVariant: WarehouseResource[] = []
  commodityEntries: WarehouseCommodityStockEntryResource[] = [];
  breadcrumbItems: MenuItem[] = [];
  item: any
  operation = '';
  imageFile!: string;

  warehouseList!: WarehouseResource[];
  commodityVariantList!: CommodityVariantResource[];

  types = [
    { name: E_WarehouseCommodityStockEntryType.PURCHASE_ORDER },
    { name: E_WarehouseCommodityStockEntryType.STOCK_TRANSFER }];

  statuses = [
    { name: E_WarehouseCommodityStockEntryStatus.PENDING },
    { name: E_WarehouseCommodityStockEntryStatus.COMPLETED },
    { name: E_WarehouseCommodityStockEntryStatus.DECLINED }
  ]

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private stockService: WarehouseCommodityStockEndpoint,
    private appLoadong: AppLoadingService,
    private appNotification: AppNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private fb: FormBuilder,
    private warehouseService: WarehouseEndpoint,
    private commidityStockEntryEndpoint: WarehouseCommodityStockEntryEndpoint,
    private commodityVaService: CommodityVariantEndpoint,
    private appLoading: AppLoadingService,
    private confirmationService: ConfirmationService
  ) {

    this.commodityStockEntryForm = this.fb.group({
      type: new FormControl(null, [Validators.required]),
      quantity_supplied: new FormControl(null, [Validators.required, Validators.min(1)]),
      unit_price: new FormControl(null, [Validators.required, Validators.min(1)]),
      status: new FormControl(null),
      completed: new FormControl(null),
      warehouse_uid: new FormControl(null),
    });

    this.stockUpdateForm = this.fb.group({
      restockLevel: this.fb.control('', [
        Validators.required
      ]),
      holdingLevel: this.fb.control('', [
        Validators.required
      ])
      // warehouse: this.fb.control('', [Validators.required]),
      // commodityVariant: this.fb.control('', [
      //   Validators.required
      // ]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Commodity Stock List',
      routerLink: [
        '/m/warehouse/warehouse/commodity-stock/list'
      ]
    });
    this.breadcrumbItems.push({
      label: 'Detail Page'
      // routerLink: ['/m/commodity/category/new']
    });
    this.appLoading.startLoading('Loading...');

    this.route.data.subscribe({
      next: (response) => {
        this.stockByUid = response['record'];
        this.imageFile = imagePathPrefix + this.stockByUid?.commodityVariant?.image_file;
        this.commodityEntries = this.stockByUid?.stockEntries ?? [];
        this.uid = this.stockByUid.uid;
        this.appLoading.startLoading('Loading...');
      },
      error: (error) => {
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message
        });
        this.appLoading.startLoading('Loading...');
      }
    });

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
      next: (response) => {
        this.commodityVariantList = response;
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

    this.stockService.findVariantByUid(this.stockByUid.commodity_variant_uid).subscribe({
      next: (response) => {
        response.forEach(item => {
          if (item.warehouse) {
            this.warehousesByVariant.push(item.warehouse);
          }
        });
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
    this.router.navigate([
      '/m/warehouse/warehouse/commodity-stock/list'
    ]);
  }
  backbtn() {
    this.updateMode = false;
  }

  onEdit(formData: any) {
    this.updateMode = true;
    this.uid = formData.uid;
    console.log(this.uid);

    const payload: UpdateWarehouseCommodityStockDto = {
      restock_target_level: formData.restock_target_level,
      holding_target_level: formData.holding_target_level,
      status: 'active'

      // warehouse_uid: formData.warehouse.uid,
      // commodity_variant_uid: formData.commodityVariant.uid,
    };

    this.fc['restockLevel'].patchValue(
      payload.restock_target_level
    );
    this.fc['holdingLevel'].patchValue(
      payload.holding_target_level
    );
    // this.fc['warehouse'].patchValue(payload.warehouse_uid);
    // this.fc['commodityVariant'].patchValue(
    //   payload.commodity_variant_uid
    // );
  }

  onDelete(uid: string) {
    console.log(uid);
    this.confirmationService.confirm({
      key: 'confirm1',
      message:
        'Are you sure you want to perform this action',
      accept: () => {
        this.appLoading.startLoading('Loading....');
        this.stockService.delete(uid).subscribe({
          next: (response) => {
            this.appLoading.stopLoading();
            this.appNotification.showSuccess({
              title: 'Success',
              detail:
                'Commodity stock deleted successfully!'
            });
            this.router.navigate([
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
    });
  }

  get fc() {
    return this.stockUpdateForm.controls;
  }

  update() {
    this.appLoading.startLoading('Loading');

    const formData = this.stockUpdateForm.value;

    const payload: UpdateWarehouseCommodityStockDto = {
      restock_target_level: formData.restockLevel,
      holding_target_level: formData.holdingLevel,
      status: 'active'

      // warehouse_uid: formData.warehouse.uid,
      // commodity_variant_uid: formData.commodityVariant.uid,
    };

    this.stockService.update(this.uid, payload).subscribe({
      next: (response) => {
        this.appLoading.stopLoading();
        this.appNotification.showSuccess({
          title: 'Success',
          detail: 'Commodity stock updated successfully!'
        });
        this.updateMode = false;
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
        this.updateMode = false;
      }
    });
  }

  get commodityStockEntryFormControls() {
    return this.commodityStockEntryForm.controls;
  }

  gotoNewPage() {
    this.commodityStockEntryForm.reset();
    this.operation = 'New';
  }
  back() {
    this.commodityStockEntryForm.reset();
    this.operation = '';
  }

  onSubmit() {
    const status = this.commodityStockEntryFormControls['status'].value;
    const completed = this.commodityStockEntryFormControls['completed'].value;
    const warehouse_uid = this.commodityStockEntryFormControls['warehouse_uid'].value;
    const formData = {
      type: <string>this.commodityStockEntryFormControls['type'].value,
      quantity_supplied: <number>this.commodityStockEntryFormControls['quantity_supplied'].value,
      unit_price: <number>this.commodityStockEntryFormControls['unit_price'].value,
      commodity_stock_uid: this.stockByUid.uid,
      status,
      completed,
      warehouse_uid,
    };
    this.appLoading.startLoading('proccessing . . .');


    const httpCall = this.operation === 'Edit' ?
      this.commidityStockEntryEndpoint.update(this.item.uid, formData) :
      this.commidityStockEntryEndpoint.create(formData);

    httpCall.subscribe({
      next: (response) => {
        this.appLoading.stopLoading()
        let item;
        if (this.operation === 'Edit') {
          item = this.commodityEntries.map((item: any) => {
            if (item.uid === response.uid) {
              return response;
            }
            return item;
          });
        }
        else {
          item = this.commodityEntries;
          item.push(response as any);
        }

        this.commodityStockEntryForm.reset();
        this.appNotification.showSuccess({
          title: 'Commodity Stock Entry',
          detail: 'Operation was Successfull',
        });
        this.operation = '';
        this.commodityStockEntryForm.reset();
        this.commodityEntries = item;

        this.stockByUid = {
          ...this.stockByUid,
          ...response
        }
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Oops !!!',
          detail: error.error.message.message,
        });
      }
    });
  }

  viewRecord(item: any) {
    this.operation = 'View';
    this.item = item;
  }

  editEntry() {
    if (this.item.completed) {
      this.appNotification.showInfo({
        title: 'Stock Entry Record cannot be Edited',
        detail: 'cannot be Edited',
      });

    }
    this.commodityStockEntryFormControls['type'].patchValue(this.item.type);
    this.commodityStockEntryFormControls['quantity_supplied'].patchValue(this.item.quantity_supplied);
    this.commodityStockEntryFormControls['unit_price'].patchValue(this.item.unit_price);
    this.commodityStockEntryFormControls['status'].patchValue(this.item.status);
    this.commodityStockEntryFormControls['completed'].patchValue(false);
    this.operation = 'Edit';
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

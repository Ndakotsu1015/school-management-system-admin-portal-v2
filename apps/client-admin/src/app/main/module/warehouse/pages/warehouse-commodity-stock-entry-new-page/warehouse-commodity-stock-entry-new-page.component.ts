// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { WarehouseCommodityStockEntryEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock-entry.endpoint';
// import { WarehouseCommodityStockEndpoint } from 'apps/client-admin/src/app/api/endpoints/stock/warehouse-commodity-stock.endpoint';
// import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
// import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
// import { E_WarehouseCommodityStockEntryType } from 'libs/api-interfaces/src/lib/dtos/admin';
// import { WarehouseCommodityStockResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
// import { MenuItem } from 'primeng/api';
// import { DropdownFilterOptions } from 'primeng/dropdown';

// @Component({
//   templateUrl:
//     './warehouse-commodity-stock-entry-new-page.component.html',
//   styleUrls: [
//     './warehouse-commodity-stock-entry-new-page.component.scss'
//   ]
// })
// export class WarehouseCommodityStockEntryNewPageComponent implements OnInit {
//   commodityStockEntryForm: FormGroup;
//   breadcrumbItems!: MenuItem[];
//   filterValue = '';

//   types = [
//     { name: E_WarehouseCommodityStockEntryType.PURCHASE_ORDER },
//     { name: E_WarehouseCommodityStockEntryType.STOCK_TRANSFER }];
//   commodityStocks: WarehouseCommodityStockResource[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private appNotificationService: AppNotificationService,
//     private appLoadingSevice: AppLoadingService,
//     private readonly commodityStockEndpoint: WarehouseCommodityStockEndpoint,
//     private readonly commidityStockEntryEndpoint: WarehouseCommodityStockEntryEndpoint,
//   ) {
//     const item = new FormGroup({
//       quantity_supplied: new FormControl(null, [Validators.required, Validators.min(1)]),
//       unit_price: new FormControl(null, [Validators.required, Validators.min(1)]),
//       commodity_stock_uid: new FormControl(null),
//     })
//     this.commodityStockEntryForm = this.fb.group({
//       type: new FormControl(null, [Validators.required]),

//       items: new FormArray([item]),
//     });
//   }

//   ngOnInit(): void {
//     this.breadcrumbItems = [];
//     this.breadcrumbItems.push({
//       label: 'Dashboard',
//       routerLink: ['/main/dashboard']
//     });
//     this.breadcrumbItems.push({
//       label: 'New Commodity Stock Entry'
//     });

//     this.appLoadingSevice.startLoading('proccessing . . .');

//     this.commodityStockEndpoint.list().subscribe({
//       next: (response) => {
//         this.commodityStocks = response;
//         console.log(response)
//         this.appLoadingSevice.stopLoading();
//       },
//       error: (error) => {
//         this.appLoadingSevice.stopLoading();
//       }
//     });


//   }

//   // myResetFunction(options: DropdownFilterOptions) {
//   //   options?.reset();
//   //   this.filterValue = '';
//   // }

//   get commodityStockEntryFormItemsControls() {
//     return (<FormArray>this.commodityStockEntryForm.controls['items']).controls;
//   }

//   get itemslastIndex() {
//     return this.commodityStockEntryFormItemsControls.length;
//   }

//   addItemForm() {
//     if (this.commodityStockEntryFormItemsControls[this.itemslastIndex - 1].invalid) {
//       return;
//     }
//     const item = this.fb.group({
//       quantity_supplied: new FormControl(null, [Validators.required, Validators.min(1)]),
//       unit_price: new FormControl(null, [Validators.required, Validators.min(1)]),
//       commodity_stock_uid: new FormControl(null),
//     });

//     (<FormArray>this.commodityStockEntryFormControls['items']).push(item);
//   }

//   removeItemForm() {
//     (<FormArray>this.commodityStockEntryFormControls['items']).removeAt(this.itemslastIndex - 1);
//   }

//   get commodityStockEntryFormControls() {
//     return this.commodityStockEntryForm.controls;
//   }

//   onSubmit() {
//     const formData = {
//       type: this.commodityStockEntryFormControls['type'].value.name,
//       items: this.commodityStockEntryFormControls['items'].value
//     };
//     this.appLoadingSevice.startLoading('proccessing . . .');

//     this.commidityStockEntryEndpoint.create(formData).subscribe({
//       next: () => {
//         this.appLoadingSevice.stopLoading()
//         this.appNotificationService.showSuccess({
//           title: 'Commodity Stock Entry',
//           detail: 'was successfully created',
//         });
//       },
//       error: (error) => {
//         this.appLoadingSevice.stopLoading();
//         console.log(error)
//         this.appNotificationService.showError({
//           title: 'Oops !!!',
//           detail: error.error.message,
//         });
//       }
//     });
//   }
// }

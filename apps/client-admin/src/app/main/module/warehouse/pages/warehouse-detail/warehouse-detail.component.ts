/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AdminDtos, WarehouseResources } from '@hacienda-platform/api-interfaces';
import { WarehouseTypeEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-type.endpoint';
import { WarehouseOwnerResource, WarehouseResource, WarehouseTypeResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { GeoLgaResource } from 'libs/api-interfaces/src/lib/resources/geo';
import { WarehouseOwnerEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint';
import { WarehouseEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse.endpoint';
import { GeoLgaEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/geo-lga.endpoint';

@Component({
  selector: 'hacienda-platform-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss'],
})
export class WarehouseDetailComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  uid: any;
  operation: any | undefined
  warehouse!: WarehouseResource;
  warehouseTypes: WarehouseTypeResource[] = [];
  warehouseOwners: WarehouseOwnerResource[] = [];
  geoLgas: GeoLgaResource[] = [];
  updateWarehouseDto?: AdminDtos.UpdateWarehouseDto;
  selectedOwner?: WarehouseOwnerResource;
  selectedType?: WarehouseTypeResource;
  selectedLga?: GeoLgaResource;

  warehouseForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    address: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    // status: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    owner: this.fb.control('', [Validators.required]),
    type: this.fb.control('', [Validators.required]),
    geoLga: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private warehousTypeEndpoint: WarehouseTypeEndpoint,
    private warehousOwnerEndpoint: WarehouseOwnerEndpoint,
    private geoLgaEndpoint: GeoLgaEndpoint,
    private warehouseEndpoint: WarehouseEndpoint,
    private primengConfig: PrimeNGConfig,
  ) { }


  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Warehouses', routerLink: ['/m/warehouse/warehouse/list'] });
    this.breadcrumbItems.push({ label: 'Detail' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('loading');
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.uid = params['uid'];
        this.warehouseEndpoint.findByUid(this.uid).subscribe({
          next: (response) => {
            this.appLoadingService.stopLoading();
            this.warehouse = response;
            this.updateWarehouseDto = {
              name: this.warehouse.name,
              address: this.warehouse.name,
              type_uid: this.warehouse.type?.uid ?? '',
              owner_uid: this.warehouse.owner?.uid ?? '',
              geo_lga_id: this.warehouse.geoLga?.id ?? 0
            };
            this.selectedOwner = this.warehouse?.owner
            this.selectedType = this.warehouse?.type
            this.selectedLga = this.warehouse?.geoLga
          },
          error: (error) => {
            this.appLoadingService.stopLoading();
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message
            });
            this.back();
          }
        });

      }
    }
    );

    this.warehousTypeEndpoint.list()
      .subscribe({
        next: (data) => {
          this.warehouseTypes = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
    this.warehousOwnerEndpoint.list()
      .subscribe({
        next: (data) => {
          this.warehouseOwners = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
    this.geoLgaEndpoint.list()
      .subscribe({
        next: (data) => {
          this.geoLgas = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  get warehouseFormControls() {
    return this.warehouseForm.controls;
  }

  back() {
    window.history.back();
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.updateWarehouseDto = {
        name: this.warehouseFormControls['name'].value,
        address: this.warehouseFormControls['address'].value,
        owner_uid: this.warehouseFormControls['owner'].value.uid,
        type_uid: this.warehouseFormControls['type'].value.uid,
        geo_lga_id: this.warehouseFormControls['geoLga'].value.id,
      }
      this.appLoadingService.startLoading('Loading...');
      if (!this.updateWarehouseDto) {
        return;
      }
      this.warehouseEndpoint.update(this.uid, this.updateWarehouseDto).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Warehouse',
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
      this.warehouseFormControls['name'].patchValue(this.warehouse.name);
      this.warehouseFormControls['address'].patchValue(this.warehouse.address);
      this.warehouseFormControls['owner'].patchValue(this.warehouse.owner!.uid);
      this.warehouseFormControls['type'].patchValue(this.warehouse.type!.uid);
      this.warehouseFormControls['geoLga'].patchValue(this.warehouse.geoLga);
    }
  }


  delete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.warehouseEndpoint.delete(this.uid).subscribe({
          next: () => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showSuccess({
              title: 'Warehouse',
              detail: 'was Succefully Deleted',
            });
            return this.router.navigate(['/m/warehouse/warehouse/list']);
          },
          error: (error) => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message,
            });
          }
        });

      },
      reject: () => {
        this.appNotificationService.showInfo({
          title: 'Oops!!!',
          detail: 'Operation was Cancelled',
        });
      }

    });
  }

  preview() {
    const type_uid = this.warehouseForm.value.type.uid;
    const owner_uid = this.warehouseForm.value.owner.uid;
    const geo_lga_id = this.warehouseForm.value.geoLga.id;
    this.selectedType = this.warehouseTypes.find(e => e.uid == type_uid);
    this.selectedOwner = this.warehouseOwners.find(e => e.uid == owner_uid);
    this.selectedLga = this.geoLgas.find(e => e.id == geo_lga_id);
    this.updateWarehouseDto = {
      name: this.warehouseForm.value.name,
      address: this.warehouseForm.value.address,
      type_uid: type_uid,
      owner_uid: owner_uid,
      geo_lga_id: geo_lga_id,
    };
    this.operation = 'Update';
  }
  resetForm() {
    this.warehouseForm.reset();
    this.operation = '';
  }

  goBack() {
    window.history.back();
  }

  closeForm() {
    this.operation = "Update";
  }
}

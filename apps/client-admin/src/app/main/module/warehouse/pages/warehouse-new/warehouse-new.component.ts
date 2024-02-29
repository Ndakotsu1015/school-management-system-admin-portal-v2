/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WarehouseOwnerEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint';
import { WarehouseTypeEndpoint } from './../../../../../api/endpoints/warehouse-type.endpoint';
import { GeoLgaResource } from 'libs/api-interfaces/src/lib/resources/geo';
import { GeoStateResource } from 'libs/api-interfaces/src/lib/resources/geo';
import {
  WarehouseOwnerResource,
  WarehouseResource,
  WarehouseTypeResource
} from './../../../../../../../../../libs/api-interfaces/src/lib/resources/warehouse';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MenuItem,
  PrimeNGConfig
} from 'primeng/api';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { WarehouseEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse.endpoint';
import { CreateWarehouseDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { GeoStateEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/geo-state.endpoint';
import { GeoLgaEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/geo-lga.endpoint';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'hacienda-platform-warehouse-new',
  templateUrl: './warehouse-new.component.html',
  styleUrls: ['./warehouse-new.component.scss']
})
export class WarehouseNewComponent implements OnInit {

  @ViewChild("placesRef") placesRef!: GooglePlaceDirective;
  breadcrumbItems!: MenuItem[];
  warehouses: WarehouseResource[] = [];
  owners: WarehouseOwnerResource[] = [];
  states: GeoStateResource[] = [];
  geoLgas: GeoLgaResource[] = [];
  loadedLgas: GeoLgaResource[] = [];
  wareHouseTypes: WarehouseTypeResource[] = [];
  warehouseLocation!: { lat: number; lng: number; };
  canSubmit = false;
  warehouseAddress = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private primengConfig: PrimeNGConfig,
    private readonly appLoadingService: AppLoadingService,
    private confirmationService: ConfirmationService,
    private warehouseEndpoint: WarehouseEndpoint,
    private warehouseTypeEndpoint: WarehouseTypeEndpoint,
    private warehouseOwnerEndpoint: WarehouseOwnerEndpoint,
    private stateEndpoint: GeoStateEndpoint,
    private lgaEndpoint: GeoLgaEndpoint,
    private readonly appNotificationService: AppNotificationService
  ) { }

  warehouseForm: FormGroup = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    address: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    type_id: this.fb.control('', [Validators.required]),
    owner_id: this.fb.control('', [Validators.required]),
    state_id: this.fb.control('', [Validators.required]),
    geo_lga_id: this.fb.control('', [Validators.required])
  });
  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard'],
      // icon: 'pi pi-home',
      styleClass: ''
    });
    this.breadcrumbItems.push({
      label: 'List of Warehouses',
      routerLink: ['/m/warehouse/warehouse/list']
    });
    this.breadcrumbItems.push({ label: 'Add New' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.warehouseTypeEndpoint.list().subscribe({
      next: (data) => {
        this.wareHouseTypes = data;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });

    this.warehouseOwnerEndpoint.list().subscribe({
      next: (data) => {
        this.owners = data;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });

    this.stateEndpoint.list().subscribe({
      next: (data) => {
        this.states = data;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });

    this.lgaEndpoint.list().subscribe({
      next: (data) => {
        this.geoLgas = data;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });
  }

  handleAddressChange(address: Address) {
    this.warehouseLocation = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    };

    this.warehouseAddress = address.formatted_address;
    this.warehouseForm.controls['address'].patchValue(this.warehouseAddress);
  }

  save() {
    if (!this.warehouseAddress || this.warehouseAddress != this.warehouseForm.value.address) {
      this.appNotificationService.showWarning({
        title: 'Please, Enter the valid delivery address',
      });
      return;
    }
    this.warehouseAddress = '';
    const formData: CreateWarehouseDto = {
      name: this.warehouseForm.value.name,
      address: this.warehouseForm.value.address,
      owner_uid: this.warehouseForm.value.owner_id.uid,
      type_uid: this.warehouseForm.value.type_id.uid,
      geo_lga_id: this.warehouseForm.value.geo_lga_id.id
    };

    this.appLoadingService.startLoading('Saving Data...');
    this.warehouseEndpoint.create(formData).subscribe({
      next: (data) => {
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Operation successful',
          detail:
            'New Warehouse created successfully'
        });
        this.warehouseForm.reset();
        this.router.navigate([
          '/m/warehouse/warehouse/list'
        ]);
      },
      error: (error) => {
        this.appNotificationService.showError({
          title: error.error.error,
          detail: error.error.message
        });
        this.appLoadingService.stopLoading();
      }
    });
  }

  loadLgas(e: any) {
    this.loadedLgas = [];
    this.loadedLgas = this.geoLgas.filter(
      (m) => m.state_id === e.value.id
    );
  }

  goBack() {
    window.history.back();
  }
}

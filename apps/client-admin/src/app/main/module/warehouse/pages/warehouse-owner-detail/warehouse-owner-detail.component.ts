import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { WarehouseOwnerEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint';

import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';

import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { Validator } from 'class-validator';

import { WarehouseOwnerResource } from 'libs/api-interfaces/src/lib/resources/warehouse';

import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'hacienda-platform-warehouse-owner-detail',
  templateUrl: './warehouse-owner-detail.component.html',
  styleUrls: ['./warehouse-owner-detail.component.scss']
})
export class WarehouseOwnerDetailComponent implements OnInit {
  warehouseOwnerForm: FormGroup;
  uid = '';
  warehouseOwner: any;
  breadcrumbItems!: MenuItem[];

  operation = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private warehouseOwnerEndpoint: WarehouseOwnerEndpoint,
  ) {
    this.warehouseOwner = this.route.snapshot.data['data'];
    this.uid = this.warehouseOwner.uid;

    this.warehouseOwnerForm = this.fb.group({
      full_name: new FormControl(null, [Validators.required, Validators.min(3)]),
      contact_phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{11}$') ]),
      address: new FormControl(null, [Validators.required, Validators.min(8)]),
    });

  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List', routerLink: ['/m/warehouse/warehouse/owner'] });
    this.breadcrumbItems.push({ label: 'Warehouse Owner Detail' });
    this.primengConfig.ripple = true;
  }

  get warehouseOwnerFormControls() {
    return this.warehouseOwnerForm.controls;
  }
  resetForm() {
    this.warehouseOwnerForm.reset();
    this.operation = '';
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.appLoadingService.startLoading('Loading...');
      this.warehouseOwnerEndpoint.update(this.uid, this.warehouseOwner).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Warehouse Owner',
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
      this.warehouseOwnerFormControls['full_name'].patchValue(this.warehouseOwner.full_name);
      this.warehouseOwnerFormControls['address'].patchValue(this.warehouseOwner.address);
      this.warehouseOwnerFormControls['contact_phone'].patchValue(this.warehouseOwner.contact_phone);
    }
  }

  deleteWarehouseOwner() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure you want to delete this record?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.warehouseOwnerEndpoint.delete(this.uid).subscribe({
          next: () => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showSuccess({
              title: 'Warehouse Owner',
              detail: 'Record was Successfully Deleted',
            });
            return this.router.navigate(['m/warehouse/warehouse/owner/list']);
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
    this.warehouseOwner = {
      full_name: this.warehouseOwnerFormControls['full_name'].value,
      address: this.warehouseOwnerFormControls['address'].value,
      contact_phone: this.warehouseOwnerFormControls['contact_phone'].value
    };
    this.operation = 'Update';

  }

  back() {
    window.history.back();
  }
  stepBack() {
    this.operation = '';
  }

  goBack() {
    window.history.back();
  }
}

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseOwnerEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CreateWarehouseOwnerDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'hacienda-platform-warehouse-owner-new',
  templateUrl: './warehouse-owner-new.component.html',
  styleUrls: ['./warehouse-owner-new.component.scss'],
})
export class WarehouseOwnerNewComponent implements OnInit {
  warehouseOwnerForm: FormGroup;
  formData?: CreateWarehouseOwnerDto;
  breadcrumbItems: MenuItem[] = [];

  preview = false;

  constructor(
    private appNotificationService: AppNotificationService,
    private _fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private appLoadingService: AppLoadingService,
    private warehouseOwnerEndpoint: WarehouseOwnerEndpoint,
    private readonly router: Router,
  ) {
    this.warehouseOwnerForm = this._fb.group({
      full_name: new FormControl(null, [Validators.required, Validators.min(3)]),
      contact_phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      address: new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'New Warehouse Owner' });
    this.primengConfig.ripple = true;
  }


  get warehouseOwnerFormControls() {
    return this.warehouseOwnerForm.controls;
  }

  editForm() {
    this.preview = false;
  }

  gotoPreview() {
    const formData = {
      full_name: this.warehouseOwnerFormControls['full_name'].value,
      contact_phone: this.warehouseOwnerFormControls['contact_phone'].value,
      address: this.warehouseOwnerFormControls['address'].value
    };
    this.formData = formData;
    this.preview = true;
  }

  resetform() {
    this.warehouseOwnerForm.reset();
    this.preview = false;
  }
  processForm() {
    this.appLoadingService.startLoading('Loading');
    this.warehouseOwnerEndpoint.create(<CreateWarehouseOwnerDto>this.formData).subscribe({
      next: (response) => {
        this.resetform();
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Warehouse Owner',
          detail: 'Record was Successfully Added!!!'
        });
        this.router.navigate(['/m/warehouse/warehouse/owner/detail/', response.uid]);
      },
      error: (error) => {
        this.preview = false;
        this.appLoadingService.stopLoading();

        this.appNotificationService.showError({
          title: 'Oops!!!',
          detail: error.error.message.message,
        });
      }
    });
  }

  goBack() {
    window.history.back();
  }

}

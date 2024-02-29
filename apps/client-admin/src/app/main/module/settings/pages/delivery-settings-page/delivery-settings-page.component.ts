/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { DeliverysettingsResource } from 'libs/api-interfaces/src/lib/resources/delivery-settings';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { DeliverySettingsEndpoint } from 'apps/client-admin/src/app/api/endpoints/settings.endpoint';
import { UpdateDeliverySettingsDto } from 'libs/api-interfaces/src/lib/dtos/admin';


@Component({
  selector: 'hacienda-platform-delivery-settings-page',
  templateUrl: './delivery-settings-page.component.html',
  styleUrls: ['./delivery-settings-page.component.scss']
})
export class DeliverySettingsPageComponent
  implements OnInit {
  breadcrumbItems!: MenuItem[];
  deliverySetting?: DeliverysettingsResource;
  canUpdate = false;

  deliverySettingForm: FormGroup = this.fb.group({
    charges_per_kilometer: this.fb.control('', [Validators.required]),
  });

  constructor(private appLoadingService: AppLoadingService,
    private deliverySettingsEndpoint: DeliverySettingsEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private router: Router,
    private readonly fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Delivery Charges Settings' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.deliverySettingsEndpoint.getDeliveryCharges().subscribe({
      next: (response) => {
        this.deliverySetting = response;
        this.appLoadingService.stopLoading();
      },

      error: (err) => {
        this.appNotificationService.showError({ title: err });
        this.appLoadingService.stopLoading();
      }
    });
  }

  save() {
    const formData: UpdateDeliverySettingsDto = {
      charges_per_kilometer: this.deliverySettingForm.controls['charges_per_kilometer'].value,
    };

    console.warn(formData);

    this.appLoadingService.startLoading('Saving Data...');
    this.deliverySettingsEndpoint.updateOrCreate(formData)
      .subscribe({
        next: (data) => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'New Commodity Variant created successfully' });
          this.deliverySettingForm.reset()
          window.location.reload();
        },
        error: (error) => {
          this.appNotificationService.showError({
            title: error.error.error,
            detail: error.error.message,
          });
          this.appLoadingService.stopLoading();
        }
      })
  }

  goBack() {
    this.canUpdate = false
    this.router.navigate(['/m/settings/general-settings/delivery-settings']);
  }

  updateCharges() {
    this.canUpdate = true
  }
}

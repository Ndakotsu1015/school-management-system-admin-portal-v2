import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
import { LogisticsProviderEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'hacienda-platform-logistics-provider-new-page',
  templateUrl: './logistics-provider-new-page.component.html',
  styleUrls: ['./logistics-provider-new-page.component.scss']
})
export class LogisticsProviderNewPageComponent implements OnInit {
  logisticsProviderForm: FormGroup;
  formData?: AdminDtos.CreateLogisticsProviderDto;
  breadcrumbItems: MenuItem[] = [];

  preview = false;

  constructor(
    private appNotificationService: AppNotificationService,
    private _fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private appLoadingService: AppLoadingService,
    private logisticsProviderEndpoint: LogisticsProviderEndpoint,
    private router: Router,
  ) {
    this.logisticsProviderForm = this._fb.group({
      name: new FormControl(null, [Validators.required, Validators.min(3)]),
      office_address: new FormControl(null, [Validators.required, Validators.min(10)]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'New Logistics Provider' });
    this.primengConfig.ripple = true;
  }

  get logisticsProviderFormControls() {
    return this.logisticsProviderForm.controls;
  }

  editForm() {
    this.preview = false;
  }

  gotoPreview() {
    const formData = {
      name: this.logisticsProviderFormControls['name'].value,
      office_address: this.logisticsProviderFormControls['office_address'].value,
    };
    this.formData = formData;
    this.preview = true;
  }

  resetform() {
    this.logisticsProviderForm.reset();
    this.preview = false;
  }
  processForm() {
    this.appLoadingService.startLoading('Loading');
    this.logisticsProviderEndpoint.create(<AdminDtos.CreateLogisticsProviderDto>this.formData).subscribe({
      next: (response) => {
        this.resetform();
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({
          title: 'Logistics Provider',
          detail: 'Record was Successfully Added!!!'
        });
        this.router.navigate(['/m/logistics/logistics/provider/detail/', response.uid]);
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
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }

}

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { CommodityEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CreateCommodityDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { CommodityCategoryResource, CommodityResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  templateUrl: './commodity-item-new-page.component.html',
  styleUrls: ['./commodity-item-new-page.component.scss'],
})
export class CommodityItemNewPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  commodities: CommodityResource[] = [];
  commodityCategories: CommodityCategoryResource[] = [];


  commodityForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    category: this.fb.control('', [Validators.required]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private primengConfig: PrimeNGConfig,
    private readonly appLoadingService: AppLoadingService,
    private confirmationService: ConfirmationService,
    private commodityEndpoint: CommodityEndpoint,
    private commodityCategoryEndpoint: CommodityCategoryEndpoint,
    private readonly appNotificationService: AppNotificationService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodity', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'Add New' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.commodityEndpoint.list()
      .subscribe({
        next: (data) => {
          this.commodities = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });

      this.commodityCategoryEndpoint.list()
      .subscribe({
        next: (data) => {
          this.commodityCategories = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  save() {
    const formData: CreateCommodityDto = {
      name: this.commodityForm.value.name,
      category_uid: this.commodityForm.value.category.uid
    };

    console.warn(formData);

    this.appLoadingService.startLoading('Saving Data...');
    this.commodityEndpoint.create(formData)
      .subscribe({
        next: (data) => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'New Commodity Item created successfully' });
          this.commodityForm.reset()
          this.router.navigate(['/m/commodity/item/detail', data.uid]);
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
    window.history.back();
  }
}

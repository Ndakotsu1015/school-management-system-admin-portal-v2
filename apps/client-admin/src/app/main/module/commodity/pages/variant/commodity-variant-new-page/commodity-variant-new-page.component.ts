import { Message } from '@hacienda-platform/api-interfaces';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  PrimeNGConfig
} from 'primeng/api';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CommodityResource,
  CommodityVariantResource,
  MeasuringUnitResource
} from 'libs/api-interfaces/src/lib/resources/commodity';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { CommodityEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity.endpoint';
import { CreateCommodityVariantDto } from 'libs/api-interfaces/src/lib/dtos/admin/inventory/commodity';
import { MeasuringUnitEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/measuring-unit.endpoint';
import { FileUploadEndpoint } from 'apps/client-admin/src/app/api/endpoints/file-upload-endpoint';
import { imagePathPrefix } from 'apps/client-admin/src/app/api/endpoints/api';

@Component({
  templateUrl:
    './commodity-variant-new-page.component.html',
  styleUrls: ['./commodity-variant-new-page.component.scss']
})
export class CommodityVariantNewPageComponent
  implements OnInit
{
  breadcrumbItems!: MenuItem[];
  commodities: CommodityResource[] = [];
  measuringUnits: MeasuringUnitResource[] = [];

  items!: MenuItem[];

  commodityVariantForm: FormGroup = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    price: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    commodity: this.fb.control('', [Validators.required]),
    measuring_unit:
      this.fb.control<MeasuringUnitResource | null>(null, [
        Validators.required
      ])
  });

  uploadImage?: string;
  uploadedImage?: string;
  uploadedImageName!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private primengConfig: PrimeNGConfig,
    private readonly appLoadingService: AppLoadingService,
    private confirmationService: ConfirmationService,
    private commodityVariantEndpoint: CommodityVariantEndpoint,
    private readonly fileUploadEndpoint: FileUploadEndpoint,
    private commodityEndpoint: CommodityEndpoint,
    private readonly measuringUnitEndpoint: MeasuringUnitEndpoint,
    private readonly appNotificationService: AppNotificationService
  ) {}
  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of Commodity Variant',
      routerLink: ['/m/commodity/variant/list']
    });
    this.breadcrumbItems.push({ label: 'Add New' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');

    this.commodityEndpoint.list().subscribe({
      next: (data) => {
        this.commodities = data;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });

    this.measuringUnitEndpoint.list().subscribe({
      next: (data) => {
        this.measuringUnits = data;
        console.log('units...', this.measuringUnits);

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

  save() {
    //Checking to see if the user upload an image,
    //if not throw and error notification to the user on upload image field..
    if (!this.uploadedImageName) {
      this.appNotificationService.showError({
        title: 'Error',
        detail: 'Upload a commodity variant image!'
      });

      return;
    }
    const formData: CreateCommodityVariantDto = {
      name: this.commodityVariantForm.controls['name']
        .value,
      price:
        this.commodityVariantForm.controls['price'].value,
      commodity_uid:
        this.commodityVariantForm.controls['commodity']
          .value.uid,
      measuring_unit_uid:
        this.commodityVariantForm.controls['measuring_unit']
          .value.uid,
      image_file: this.uploadedImageName
    };

    console.warn(formData);

    this.appLoadingService.startLoading('Saving Data...');
    this.commodityVariantEndpoint
      .create(formData)
      .subscribe({
        next: (data) => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Operation successful',
            detail:
              'New Commodity Variant created successfully'
          });
          this.commodityVariantForm.reset();
          this.router.navigate([
            '/m/commodity/variant/detail/',
            data.uid
          ]);
        },
        error: (error) => {
          this.appNotificationService.showError({
            title: error.error.message.error,
            detail: error.error.message.message
          });
          this.appLoadingService.stopLoading();
        }
      });
  }

  handleFileInputUploadImage(e: any) {
    const file = e.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image_file', file, file.name);

    this.fileUploadEndpoint
      .imageUpload(formData)
      .subscribe({
        next: (response) => {
          this.uploadedImageName = response.filename;
          this.uploadedImage =
            imagePathPrefix + this.uploadedImageName;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // uploadPhoto() {
  //   const fileInput = this.profilePhotoUpload.nativeElement as unknown as HTMLInputElement;
  //   fileInput.click(); // Trigger the file selection dialog
  // }

  goBack() {
    window.history.back();
  }
}

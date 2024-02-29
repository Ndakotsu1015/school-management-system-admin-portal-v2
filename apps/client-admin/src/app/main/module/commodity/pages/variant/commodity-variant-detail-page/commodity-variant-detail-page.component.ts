/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { CommodityEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity.endpoint';
import { MeasuringUnitEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/measuring-unit.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AdminDtos } from 'libs/api-interfaces/src/lib/dtos';
import { CommodityResource, CommodityVariantResource, MeasuringUnitResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { imagePathPrefix } from 'apps/client-admin/src/app/api/endpoints/api';
import { FileUploadEndpoint } from 'apps/client-admin/src/app/api/endpoints/file-upload-endpoint';


@Component({
  templateUrl: './commodity-variant-detail-page.component.html',
  styleUrls: ['./commodity-variant-detail-page.component.scss'],
})
export class CommodityVariantDetailPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  uid: any;
  operation: any | undefined
  commodities: CommodityResource[] = [];
  measuringUnits: MeasuringUnitResource[] = [];
  updateCommodityVariantDto?: AdminDtos.UpdateCommodityVariantDto;
  selectedCommodity?: CommodityResource;
  selectedMeasuringUnit?: MeasuringUnitResource;
  commodityVariant!: CommodityVariantResource;
  imageFile!: string;
  uploadedImageName!: string;

  commodityVariantForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    price: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    commodity: this.fb.control('', [Validators.required]),
    measuring_unit: this.fb.control<MeasuringUnitResource | null>(null, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private readonly fileUploadEndpoint: FileUploadEndpoint,
    private commodityEndpoint: CommodityEndpoint,
    private primengConfig: PrimeNGConfig,
    private commodityVariantEndpoint: CommodityVariantEndpoint,
    private readonly measuringUnitEndpoint: MeasuringUnitEndpoint,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodity Variant', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'Detail' });
    this.primengConfig.ripple = true;


    this.appLoadingService.startLoading('loading');
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.uid = params['uid'];
        this.commodityVariantEndpoint.findByUid(this.uid).subscribe({
          next: (response) => {
            this.appLoadingService.stopLoading();
            this.commodityVariant = response;
            this.updateCommodityVariantDto = {
              name: this.commodityVariant.name,
              price: this.commodityVariant.price,
              commodity_uid: this.commodityVariant?.commodity?.uid ?? '',
              measuring_unit_uid: this.commodityVariant?.measuring_unit_uid,
              image_file: this.commodityVariant?.image_file,
            };
            this.uploadedImageName = this.commodityVariant?.image_file;
            this.imageFile = imagePathPrefix + this.commodityVariant?.image_file;
            this.selectedCommodity = this.commodityVariant?.commodity;
            this.selectedMeasuringUnit = this.commodityVariant?.measuringUnit;
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

    this.measuringUnitEndpoint.list()
      .subscribe({
        next: (data) => {
          this.measuringUnits = data;
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  get commodityVariantFormControls() {
    return this.commodityVariantForm.controls;
  }

  back() {
    window.history.back();
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.appLoadingService.startLoading('Loading...');
      if (!this.updateCommodityVariantDto) {
        return;
      }
      this.commodityVariantEndpoint.update(this.uid, this.updateCommodityVariantDto).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Commodity Variant',
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
      this.commodityVariantForm.patchValue({
        name: this.commodityVariant.name,
        price: this.commodityVariant.price,
        commodity: this.commodityVariant.commodity?.uid,
        measuring_unit: this.commodityVariant.measuring_unit_uid,
      });
    }
  }


  delete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.commodityVariantEndpoint.delete(this.uid).subscribe({
          next: () => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showSuccess({
              title: 'Commodity',
              detail: 'was Succefully Deleted',
            });
          },
          error: (error) => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message,
            });
          }
        });
        return this.router.navigate(['/m/commodity/variant/list']);
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
    const commodity_uid = this.commodityVariantForm.controls['commodity'].value;
    const measuring_unit_uid = this.commodityVariantForm.controls['measuring_unit'].value;
    this.selectedCommodity = this.commodities.find(e => e.uid == commodity_uid);
    this.updateCommodityVariantDto = {
      name: this.commodityVariantForm.value.name,
      price: this.commodityVariantForm.value.price,
      commodity_uid: commodity_uid,
      measuring_unit_uid: measuring_unit_uid,
      image_file: this.uploadedImageName,
    };

    this.operation = 'Update';
  }
  resetForm() {
    this.commodityVariantForm.reset();
    this.operation = '';
  }

  handleFileInputUploadImage(e: any) {

    const file = e.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image_file', file, file.name);

    this.fileUploadEndpoint.imageUpload(formData).subscribe({
      next: (response) => {
        this.uploadedImageName = response.filename;
        this.imageFile = imagePathPrefix + this.uploadedImageName;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack() {
    window.history.back();
  }
}

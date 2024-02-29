/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { CommodityEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { environment } from 'apps/client-admin/src/environments/environment';
import { CommodityCategoryResource, CommodityResource, CommodityVariantResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  templateUrl: './commodity-item-detail-page.component.html',
  styleUrls: ['./commodity-item-detail-page.component.scss'],
})
export class CommodityItemDetailPageComponent implements OnInit {
  
  @ViewChild('filter') filter!:ElementRef;
  breadcrumbItems!: MenuItem[];
  uid: any;
  operation: any | undefined
  commodity!: CommodityResource;
  commodityVariants : CommodityVariantResource[] = [];
  commodityVariantsCount = 0;
  updateCommodityDto?: AdminDtos.UpdateCommodityDto;
  selectedCommodityCategory?: CommodityCategoryResource;
  commodityCategories: CommodityCategoryResource[] = [];
  loading = false;

  imagePrefix = environment.imagePathPrefix;

  commodityForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    category: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private commodityEndpoint: CommodityEndpoint,
    private primengConfig: PrimeNGConfig,
    private commodityCategoryEndpoint: CommodityCategoryEndpoint,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Commodity', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'Detail' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('loading');
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.uid = params['uid'];
        this.commodityEndpoint.findByUid(this.uid).subscribe({
          next: (response) => {
            this.appLoadingService.stopLoading();
            this.commodity = response;
            this.commodityVariants = response.variants ?? [];
            this.commodityVariantsCount = this.commodityVariants.length;
            this.updateCommodityDto = {
              name: this.commodity.name,
              category_uid: this.commodity?.category?.uid ?? ''
            };
            this.selectedCommodityCategory = this.commodity?.category;
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

  get commodityFormControls() {
    return this.commodityForm.controls;
  }

  back() {
    window.history.back();
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.appLoadingService.startLoading('Loading...');
      if (!this.updateCommodityDto) {
        return;
      }
      this.commodityEndpoint.update(this.uid, this.updateCommodityDto).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Commodity',
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
      this.commodityFormControls['name'].patchValue(this.commodity.name);
      this.commodityFormControls['category'].patchValue(this.commodity.category);
    }
  }


  delete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.commodityEndpoint.delete(this.uid).subscribe({
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
        return this.router.navigate(['/m/commodity/item/list']);
      },
      reject: () => {
        this.appNotificationService.showWarning({
          title: 'Oops!!!',
          detail: 'Operation was Cancelled',
        });
      }

    });
  }

  preview() {
    console.warn(this.commodityFormControls);
    const category_uid = this.commodityForm.value.category.uid;
    this.selectedCommodityCategory = this.commodityCategories.find(e => e.uid == category_uid);
    this.updateCommodityDto = {
      name: this.commodityForm.value.name,
      category_uid: category_uid,
      // category_uid: this.commodityFormControls['category'].value.uid
    };
    this.operation = 'Update';
  }

  resetForm() {
    this.commodityForm.reset();
    this.operation = 'Update';
  }

  closeForm() {
    this.commodityForm.reset();
    this.operation = '';
  }

  onGlobalFilter(table:Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value='';
  }

  showDetails(uid: string) {
    this.router.navigate(['/m/commodity/variant/detail', uid]);
  }

  goBack() {
    window.history.back();
  }
}

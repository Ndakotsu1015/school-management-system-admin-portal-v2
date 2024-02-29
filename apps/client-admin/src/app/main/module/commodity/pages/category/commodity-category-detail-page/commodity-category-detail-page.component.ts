import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommodityResources } from '@hacienda-platform/api-interfaces';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { UpdateCommodityCategoryDto } from 'libs/api-interfaces/src/lib/dtos/admin/inventory/commodity';
import { CommodityCategoryResource, CommodityResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './commodity-category-detail-page.component.html',
  styleUrls: [
    './commodity-category-detail-page.component.scss'
  ],
  providers: [ConfirmationService]
})
export class CommodityCategoryDetailPageComponent
  implements OnInit
{
  @ViewChild('filter') filter!:ElementRef;
  updateMode = false;
  commodityCategoryUpdateForm: FormGroup;
  uid = '';
  loading = false;
  commodityCategoryById!: CommodityCategoryResource;
  breadcrumbItems: MenuItem[] = [];
  commodities?: any;


  constructor(
    private _fb: FormBuilder,
    private appNotification: AppNotificationService,
    private appLoading: AppLoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CommodityCategoryEndpoint,
    private logger: LoggerService,
    private confirmationService: ConfirmationService
  ) {
    //setting the commodityCategoryForm to FormBuilder
    //and setting the validation required.
    this.commodityCategoryUpdateForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Commodity Category List',
      routerLink: ['/m/commodity/category/list']
    });
    this.breadcrumbItems.push({
      label: 'Detail Page'
      // routerLink: ['/m/commodity/category/new']
    });

    //receiving the route data from resolver and subscribing to it.
    //handling the error to the user interface and seting notification
    this.route.data.subscribe({
      next: (response) => {
        this.commodityCategoryById = response['record'];
        this.commodities = this.commodityCategoryById.commodities;
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message
        });
      }
    });
  }

  // back button to be route to the commodity category list page
  backbtn() {
    this.router.navigate(['/m/commodity/category/list']);
  }

  //assigning fc as a form comtrol for validation purposes in the form interface
  get fc() {
    return this.commodityCategoryUpdateForm.controls;
  }

  // On edit data will be pass and will be use to load existing data to form input..
  onEdit(data: any) {
    this.updateMode = true;
    this.uid = data.uid;
    console.log(this.uid);

    const formData = {
      name: data.name,
      description: data.description
    };

    this.fc['name'].patchValue(formData.name);
    this.fc['description'].patchValue(formData.description);
  }

  //On delete a warnig dialog box will pop and request for permission to proceed
  // data.uid will be passed to the category service in other to
  //complete the deletion process
  onDelete(data: any) {
    this.uid = data.uid;
    this.confirmationService.confirm({
      key: 'confirm1',
      message:
        'Are you sure you want to perform this action',
      accept: () => {
        this.appLoading.startLoading('Loading....');
        this.categoryService.delete(this.uid).subscribe({
          next: (response) => {
            this.appLoading.stopLoading();
            this.appNotification.showSuccess({
              title: 'Success',
              detail:
                'Commodity category deleted successfully!'
            });
            this.router.navigate([
              '/m/commodity/category/list'
            ]);
          },
          error: (error) => {
            this.appLoading.stopLoading();
            this.appNotification.showError({
              title: 'Failed',
              detail: error.error.message
            });
          }
        });
      }
    });
  }

  //On update mode a cancel button to go back to the detail page.
  onCancel() {
    this.updateMode = false;
  }

  // On update a commodity category will be updated
  onUpdate() {
    this.appLoading.startLoading('Loading');

    const formData = this.commodityCategoryUpdateForm.value;

    const payload: UpdateCommodityCategoryDto = {
      name: formData.name,
      description: formData.description
    };

    this.categoryService
      .update(this.uid, payload)
      .subscribe({
        next: (response) => {
          this.updateMode = false;
          this.appLoading.stopLoading();
          this.fmReset();
          this.appNotification.showSuccess({
            title: 'Success',
            detail: 'Commodity category updated successful!'
          });
        },
        error: (error) => {
          this.updateMode = false;
          this.appLoading.stopLoading();
          this.appNotification.showError({
            title: 'Failed',
            detail:
              'Failed to update commodity category!!' +
              error.error.message
          });
        }
      });
  }
  // reseting the form input to empty.
  fmReset() {
    return this.commodityCategoryUpdateForm.reset();
  }

  onGlobalFilter(table:Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value='';
  }

  goBack() {
    window.history.back();
  }
}

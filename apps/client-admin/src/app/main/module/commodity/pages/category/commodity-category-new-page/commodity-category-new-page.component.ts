import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommodityCategoryEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-category.endpoint';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CreateCommodityCategoryDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl:
    './commodity-category-new-page.component.html',
  styleUrls: [
    './commodity-category-new-page.component.scss'
  ]
})
export class CommodityCategoryNewPageComponent
  implements OnInit
{
  breadcrumbItems!: MenuItem[];
  commodityCategoryForm: FormGroup;
  loading = false;

  constructor(
    private _builder: FormBuilder,
    private logger: LoggerService,
    private authService: CommodityCategoryEndpoint,
    private appNotification: AppNotificationService,
    private route: Router
  ) {
    //setting commodityCategoryForm to form builder
    this.commodityCategoryForm = this._builder.group({
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
    //setting th breadcrumb items..
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
      label: 'Add New',
      routerLink: ['/m/commodity/category/new']
    });
  }

  //send a new category request to the server success and error notification handles
  save() {
    this.loading = true;
    const formData = this.commodityCategoryForm.value;
    console.log(this.commodityCategoryForm.value);
    const payload: CreateCommodityCategoryDto = {
      name: formData.name,
      description: formData.description
    };
    this.logger.logInfo(payload);
    this.authService.create(payload).subscribe({
      next: (response) => {
        this.logger.logInfo(response);
        if (response) {
          this.loading = false;
          this.appNotification.showSuccess({
            title: 'Success',
            detail:
              'Commodity category created successfully.'
          });
          this.route.navigate(['/m/commodity/category/detail/', response.uid]);
        }
      },

      error: (error) => {
        this.loading = false;
        this.logger.logInfo(error);
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message
        });
      }
    });
  }

  //a button on the new page directing to the list page.
  listPage() {
    this.route.navigate(['/m/commodity/category/list']);
  }

  // assigning fm as a form controls for validations in form interface
  get fm() {
    return this.commodityCategoryForm.controls;
  }

  goBack() {
    window.history.back();
  }
}

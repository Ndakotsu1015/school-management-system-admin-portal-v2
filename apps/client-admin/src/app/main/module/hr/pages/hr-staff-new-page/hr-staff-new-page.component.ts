/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HrStaffEndpoint } from 'apps/client-admin/src/app/api/endpoints/hr-staff.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './hr-staff-new-page.component.html',
  styleUrls: ['./hr-staff-new-page.component.scss'],
})
export class HrStaffNewPageComponent implements OnInit {

  hrStaffForm: FormGroup;
  formRequestData: any;
  breadcrumbItems!: MenuItem[];


  constructor(
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private hrStaffEndPoint: HrStaffEndpoint,
    private readonly appNotificationService:
      AppNotificationService,
    private route: ActivatedRoute
    , private router: Router,

  ) {

    this.hrStaffForm = new FormGroup({
      uid: new FormControl(),
      full_name: new FormControl(""),
      contact_email: new FormControl(""),
      contact_address: new FormControl(""),
      contact_phone: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Staff List', routerLink: ['/m/hr/staff/list'] });
    this.breadcrumbItems.push({ label: 'Add Staff' });
  }

  get hrStaffFormControls() {
    return this.hrStaffForm.controls;
  }

  addStaff() {
    const frmData = {
      full_name: this.hrStaffFormControls['full_name'].value,
      uid: this.hrStaffFormControls['uid'].value,
      contact_email: this.hrStaffFormControls['contact_email'].value,
      contact_address: this.hrStaffFormControls['contact_address'].value,
      contact_phone: this.hrStaffFormControls['contact_phone'].value

    };

    this.formRequestData = frmData;

    this.appLoadingService.startLoading('Proccessing');

    this.hrStaffEndPoint.create(this.formRequestData).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showSuccess({
          title: "Success",
          detail: "Staff Record Added Successfully!"
        });
        this.hrStaffForm.reset();
        this.appLoadingService.stopLoading();


        this.router.navigate(['/m/hr/staff/list']);

      },
      error: (err) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showError({
          title: err.error.message.error,
          detail: err.error.message.message
        })

      }

    });

  }

  goBack() {
    window.history.back();
  }


}

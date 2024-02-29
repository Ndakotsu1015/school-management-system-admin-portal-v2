import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user-group.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  templateUrl: './user-group-new-page.component.html',
  styleUrls: ['./user-group-new-page.component.scss']
})
export class UserGroupNewPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  formRequestData: any;
  canSubmit = false;
  constructor(
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private userGroupEndpoint: UserGroupEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder
  ) {}

  // user group form validation
  userGroupForm: FormGroup = this.fb.group({
    name: this.fb.control('')
  });

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard'],
      // icon: 'pi pi-home',
      styleClass: ''
    });
    this.breadcrumbItems.push({
      label: 'List of User Groups',
      routerLink: ['/m/user/groups/list']
    });
    this.breadcrumbItems.push({ label: 'Add New' });
    this.primengConfig.ripple = true;

    this.userGroupForm.statusChanges.subscribe({
      next: (status) => {
        this.canSubmit = status === 'VALID';
      }
    });
    // throw new Error('Method not implemented.');
  }

  // validators control
  get userFormControls() {
    return this.userGroupForm.controls;
  }

  // add new user group
  addUserGroup() {
    const frmData = {
      name: this.userFormControls['name'].value
    };

    console.log(frmData);

    this.formRequestData = frmData;
    this.appLoadingService.startLoading('Proccessing');

    this.userGroupEndpoint
      .create(this.formRequestData)
      .subscribe({
        next: () => {
          this.appLoadingService.stopLoading();

          this.appNotificationService.showSuccess({
            title: 'Success',
            detail: 'user Group Record Added Successfully!'
          });
          this.userGroupForm.reset();
          this.appLoadingService.stopLoading();
          this.router.navigate(['/m/user/groups/list']);
        },
        error: (error) => {
          this.appLoadingService.stopLoading();
          console.log(error);

          this.appNotificationService.showError({
            title: error.error.message.error,
            detail: error.error.message.message
          });
        }
      });
  }

  goBack() {
    window.history.back();
  }
}

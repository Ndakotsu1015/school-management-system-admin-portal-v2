import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
import { UserGroupEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user-group.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import {
  AdminUserGroupResource,
  AdminUserResource
} from 'libs/api-interfaces/src/lib/resources/admin-user';
import {
  ConfirmationService,
  MenuItem,
  PrimeNGConfig
} from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './user-group-detail-page.component.html',
  styleUrls: ['./user-group-detail-page.component.scss']
})
export class UserGroupDetailPageComponent
  implements OnInit
{
  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  breadcrumbItems!: MenuItem[];
  uid: any;
  operation: any | undefined;
  userGroup!: AdminUserGroupResource;
  users: AdminUserResource[] = [];
  updateUserGroupDto?: AdminDtos.UpdateAdminUserGroupDto;

  userGroupForm: FormGroup = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private userGroupEndpoint: UserGroupEndpoint,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of User Groups',
      routerLink: ['/m/user/groups/list']
    });
    this.breadcrumbItems.push({ label: 'Detail' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('loading');

    this.route.params.subscribe((params) => {
      if (params['uid']) {
        console.log(this.uid);

        this.uid = params['uid'];
        // let users : this.userGroups.users?

        this.userGroupEndpoint
          .findByUid(this.uid)
          .subscribe({
            next: (response) => {
              this.appLoadingService.stopLoading();
              this.userGroup = response;
              this.users = response.users ?? [];

              this.updateUserGroupDto = {
                name: this.userGroup.name
              };
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
    });
  }

  back() {
    window.history.back();
  }

    // validators control
    get userFormControls() {
      return this.userGroupForm.controls;
    }

    // filter the table search
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  // clear search or table
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  // naviagate to details page
  showDetails(uid: string) {
    // window.open(`/m/user/users/detail/${uid}`,'_blank');
    this.router.navigate(['/m/user/users/detail', uid]);
  }

    // edit or update a user group
    processRequest() {
      if (this.operation === 'Update') {
        this.updateUserGroupDto = {
          name: this.userFormControls['name'].value,
        }
        this.appLoadingService.startLoading('Loading...');
        if (!this.updateUserGroupDto) {
          return;
        }
        this.userGroupEndpoint.update(this.uid, this.updateUserGroupDto).subscribe({
          next: () => {
            this.appLoadingService.stopLoading();
            this.appNotificationService.showSuccess({
              title: 'User Group',
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
        this.userFormControls['name'].patchValue(this.userGroup.name);
      }
    }

    
  // delete a user group
  delete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this user group?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.userGroupEndpoint.delete(this.uid).subscribe({
          next: () => {
            this.appLoadingService.stopLoading();
            this.appNotificationService.showSuccess({
              title: 'User Group',
              detail: 'was Succefully Deleted'
            });
            return this.router.navigate([
              '/m/user/groups/list'
            ]);
          },
          error: (error) => {
            this.appLoadingService.stopLoading();
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message
            });
          }
        });
      },
      reject: () => {
        this.appNotificationService.showInfo({
          title: 'Oops!!!',
          detail: 'Operation was Cancelled'
        });
      }
    });
  }

  // preview
  preview() {
    // const name = this.userGroupForm.value.name.uid;
    this.updateUserGroupDto = {
      name: this.userGroupForm.value.name,
    };
    this.operation = 'Update';
  }

  // reset form
  resetForm() {
    this.userGroupForm.reset();
    this.operation = '';
  }

  goBack() {
    window.history.back();
  }
}

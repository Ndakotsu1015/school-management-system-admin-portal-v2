import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGroupEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user-group.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { AdminUserGroupResource } from 'libs/api-interfaces/src/lib/resources/admin-user';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './user-group-list-page.component.html',
  styleUrls: ['./user-group-list-page.component.scss']
})
export class UserGroupListPageComponent implements OnInit {
  breadcrumbItems!: MenuItem[];
  userGroups: AdminUserGroupResource[] = []
 
  loading = false
  @ViewChild('filter') filter!: ElementRef

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private userGroupEndpoint: UserGroupEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of User Groups', routerLink: ['/m/user/groups/list'] });
    this.breadcrumbItems.push({ label: 'List' });
    this.primengConfig.ripple = true;

    this.appLoadingService.startLoading('Loading Data...');
    this.userGroupEndpoint.list()
      .subscribe({
        next: (data) => {
          this.userGroups = data;
          this.appLoadingService.stopLoading();
          console.log(data);
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  // naviagate to details page
  showDetails(uid: string) {
    this.router.navigate(['/m/user/groups/detail', uid]);
  }

  // filter table
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // clear search or table
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  goBack() {
    window.history.back();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogisticsResources } from '@hacienda-platform/api-interfaces';
import { LogisticsProviderEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector:
    'hacienda-platform-logistics-provider-list-page',
  templateUrl:
    './logistics-provider-list-page.component.html',
  styleUrls: [
    './logistics-provider-list-page.component.scss'
  ]
})
export class LogisticsProviderListPageComponent implements OnInit {
  logisticsProviders?: LogisticsResources.LogisticsProviderResource[] = [];
  logisticsProviderForm: FormGroup;
  breadcrumbItems: MenuItem[] = [];
  uid = '';


  updateMode = false;
  loading = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private logisticsProviderEndpoint: LogisticsProviderEndpoint,
    private appLoadindingService: AppLoadingService,
    private primengConfig: PrimeNGConfig,
    private _fb: FormBuilder,
    private router: Router,
  ) {
    this.logisticsProviderForm = this._fb.group({
      name: new FormControl(null, [Validators.required, Validators.min(3)]),
      office_address: new FormControl(null, [Validators.required, Validators.min(10)]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Logistics Providers List' });
    this.primengConfig.ripple = true;

    this.appLoadindingService.startLoading('Loading');
    this.logisticsProviderEndpoint.list().subscribe({
      next: (response) => {
        this.logisticsProviders = response;
        this.appLoadindingService.stopLoading();

      },
      error: (error) => {
        this.appLoadindingService.stopLoading();
      }
    });
  }

  gotpNewPage() {
    return this.router.navigate(['/m/logistics/logistics/provider/new']);
  }

  viewRecord(uid: string) {
    return this.router.navigate(['/m/logistics/logistics/provider/detail', uid]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  get logisticsProviderFormControls() {
    return this.logisticsProviderForm.controls;
  }

  goBack() {
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }
}

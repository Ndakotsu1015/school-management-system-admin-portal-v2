import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseOwnerEndpoint } from 'apps/client-admin/src/app/api/endpoints/warehouse-owner.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { WarehouseOwnerResource } from 'libs/api-interfaces/src/lib/resources/warehouse';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'hacienda-platform-warehouse-owner',
  templateUrl: './warehouse-owner.component.html',
  styleUrls: ['./warehouse-owner.component.scss'],
})
export class WarehouseOwnerComponent implements OnInit {
  warehouseOwners?: WarehouseOwnerResource[] = [];
  warehouseOwnerForm: FormGroup;
  breadcrumbItems: MenuItem[] = [];
  uid = '';


  updateMode = false;
  loading = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private warehouseOwnerEndpoint: WarehouseOwnerEndpoint,
    private appLoadindingService: AppLoadingService,
    private primengConfig: PrimeNGConfig,
    private _fb: FormBuilder,
    private router: Router,
  ) {
    this.warehouseOwnerForm = this._fb.group({
      full_name: new FormControl(null, [Validators.required, Validators.min(3)]),
      contact_phone: new FormControl(null, Validators.required),
      address: new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Warehouse Owners List' });
    this.primengConfig.ripple = true;

    this.appLoadindingService.startLoading('Loading');
    this.warehouseOwnerEndpoint.list().subscribe({
      next: (response) => {
        this.warehouseOwners = response;
        this.appLoadindingService.stopLoading();

      },
      error: (error) => {
        this.appLoadindingService.stopLoading();
      }
    });
  }

  gotpNewPage() {
    return this.router.navigate(['/m/warehouse/warehouse/owner/new']);
  }

  viewRecord(uid: string) {
    return this.router.navigate(['/m/warehouse/warehouse/owner/detail', uid]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  get warehouseOwnerFormControls() {
    return this.warehouseOwnerForm.controls;
  }

  goBack() {
    window.history.back();
  }

}

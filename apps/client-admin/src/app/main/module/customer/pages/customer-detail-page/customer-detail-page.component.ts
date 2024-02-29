/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { CustomerResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './customer-detail-page.component.html',
  styleUrls: ['./customer-detail-page.component.scss'],
})
export class CustomerDetailPageComponent implements OnInit {

  customerDetails?: CustomerResource;
  orders: any;
  loading = false;
  breadcrumbItems: MenuItem[] = [];

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly logger: LoggerService,
  ) { }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of Customers',
      routerLink: [
        '/m/customer/customer/list'
      ]
    });
    this.breadcrumbItems.push({
      label: 'Customer Details',
    });

    this.route.data
      .subscribe({
        next: (data) => {
          this.customerDetails = data['records'];
          this.orders = this.customerDetails?.orders;
          console.log(this.orders);
        },
        error: (error) => {
          this.logger.logInfo("Could not fetch customer details");
          this.logger.logInfo(error);
        }
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  goBack(){
    window.history.back();
  }
}

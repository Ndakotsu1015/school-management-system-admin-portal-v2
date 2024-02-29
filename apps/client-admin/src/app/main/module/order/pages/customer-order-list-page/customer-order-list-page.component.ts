import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/customer-order.endpoint';
import { CustomerOrderItemResource, CustomerOrderResource, CustomerResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './customer-order-list-page.component.html',
  styleUrls: ['./customer-order-list-page.component.scss']
})

export class CustomerOrderListPageComponent implements OnInit {
  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  orders?: CustomerOrderResource[] = [];
  breadcrumbItems: MenuItem[] = [];

  data: any;
  uid: string = '';
  updateMode = false
  customerOrder: FormGroup;
  orderRequestData: any;

  constructor(private customerOrderEndpoint: CustomerOrderEndpoint,
    private router: Router) {
    this.customerOrder = new FormGroup({
      uid: new FormControl(),
      status: new FormControl(""),
      is_paid: new FormControl(""),
      payment_ref: new FormControl(""),
      created_at: new FormControl(""),
      updated_at: new FormControl(""),
      customer_id: new FormControl(""),

    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  CustomerOrderControls() {
    return this.customerOrder.controls
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Commodity Order List',
      // routerLink: [
      //   '/m/warehouse/warehouse/commodity-stock/list'
      // ]
    });
    this.customerOrderEndpoint.list().subscribe({
      next: (response) => {
        this.data = response;
      },

      error: (error) => console.log(error)
    });
  }

  goToOrderList() {
    return this.router.navigate(['/m/order/customer-order/list'])
  }

  viewOrderDetail(uid: string) {
    return this.router.navigate((['/m/order/customer-order/detail', uid]))
  }

  goBack() {
    window.history.back();
  }

}

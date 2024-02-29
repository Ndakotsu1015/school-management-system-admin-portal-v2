import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommodityVariantEndpoint } from 'apps/client-admin/src/app/api/endpoints/commodity/commodity-variant.endpoint';
import { CommodityVariantResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { DeliveryOrderItemResource, DeliveryOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'hacienda-platform-delivery-order-detail',
  templateUrl: './delivery-order-detail.component.html',
  styleUrls: ['./delivery-order-detail.component.scss']
})
export class DeliveryOrderDetailComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  breadcrumbItems: MenuItem[] = [];
  commodityVariants: CommodityVariantResource[] = [];

  deliveryOrder!: DeliveryOrderResource;

  deliveryOrderItems: DeliveryOrderItemResource[] = [];

  loading = false;

  constructor(private route: ActivatedRoute, private commodityVariantEndpoint: CommodityVariantEndpoint) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Logistics Provider',
      routerLink: ['/m/logistics/logistics/provider/list']
    });
    this.breadcrumbItems.push({
      label: 'Delivery Order Detail'
    });

    this.commodityVariantEndpoint.list().subscribe({
      next: (response) => {
        this.commodityVariants = response;
      }
    });

    this.route.data.subscribe({
      next: (response) => {
        this.deliveryOrder = response['deliveryOrder'];
        this.deliveryOrderItems = this.deliveryOrder.deliveryOrderItems ?? [];
      },
      error: (error) => {
        console.log('Error Occurred');
      }
    });
  }
  getVariantName(uid: string): string {
    const variant = this.commodityVariants.find(item => item.uid === uid);
    if (variant?.name) {
      return variant.name;
    }
    return 'specified variant not found';
  }

  goBack() {
    window.history.back();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}

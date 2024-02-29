import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { DeliveryOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';

@Component({
  selector: 'hacienda-platform-delivery-voucher',
  templateUrl: './delivery-voucher.component.html',
  styleUrls: ['./delivery-voucher.component.scss']
})
export class DeliveryVoucherComponent implements OnInit {
  constructor(
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private route: ActivatedRoute,
    private appLoading: AppLoadingService,
  ) { }

  deliveryOrders: DeliveryOrderResource[] = [];
  totalAmount = 0;
  vat = 0;
  deliveryAddress = '';
  today = new Date();

  items: { description: string, amount: number }[] = [];

  ngOnInit(): void {

    this.appLoadingService.startLoading('Loading...');
    this.route.data.subscribe({
      next: (response) => {
        this.deliveryAddress = response['data'].deliveryOrders[0].delivery_address;

        response['data'].deliveryOrders.forEach((data: any) => {
          data.deliveryOrderItems.forEach((item: any) => {
            this.items.push({ description: item.commodityVariant.name, amount: item.commodityVariant.price });

            this.totalAmount = this.totalAmount + item.commodityVariant.price;
          });

        });
        // console.log('Voucher: ', response['data'].deliveryOrders)

        this.appLoadingService.stopLoading();
      },
      error: (error) => {
        this.appNotificationService.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
        this.appLoadingService.stopLoading();
      }
    });
  }
}

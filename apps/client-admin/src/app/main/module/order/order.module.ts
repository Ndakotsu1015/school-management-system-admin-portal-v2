import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CustomerOrderListPageComponent } from './pages/customer-order-list-page/customer-order-list-page.component';
import { CustomerOrderDetailPageComponent } from './pages/customer-order-detail-page/customer-order-detail-page.component';
import { UiModule } from '@hacienda-platform/ui';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CustomerDeliveryOrderPageComponent } from './pages/customer-delivery-order-page/customer-delivery-order-page.component';
import { DeliveryVoucherComponent } from './pages/delivery-voucher/delivery-voucher.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  declarations: [
    CustomerOrderListPageComponent,
    CustomerOrderDetailPageComponent,
    CustomerDeliveryOrderPageComponent,
    DeliveryVoucherComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VirtualScrollerModule
  ],
  providers: [ConfirmationService]
})
export class OrderModule {}

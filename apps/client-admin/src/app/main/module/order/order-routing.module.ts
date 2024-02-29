import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOrderDetailPageComponent } from './pages/customer-order-detail-page/customer-order-detail-page.component';
import { CustomerOrderListPageComponent } from './pages/customer-order-list-page/customer-order-list-page.component';
import { CustomerDeliveryOrderPageComponent } from './pages/customer-delivery-order-page/customer-delivery-order-page.component';
import { DeliveryVoucherComponent } from './pages/delivery-voucher/delivery-voucher.component';
import { CustomerOrderResolver } from './resolvers/customer-order-detail.resolver';

const routes: Routes = [
  {
    path: 'customer-order',
    children: [
      { path: 'delivery/voucher/:uid', component: DeliveryVoucherComponent, resolve: { data: CustomerOrderResolver } },
      { path: 'list', component: CustomerOrderListPageComponent },
      { path: 'detail/:uid', component: CustomerOrderDetailPageComponent },
      { path: 'delivery/:uid', component: CustomerDeliveryOrderPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

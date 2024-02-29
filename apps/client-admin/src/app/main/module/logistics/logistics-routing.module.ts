import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticsFleetTypeDetailPageComponent } from './pages/logistics-fleet-type-detail-page/logistics-fleet-type-detail-page.component';
import { LogisticsFleetTypeEditPageComponent } from './pages/logistics-fleet-type-edit-page/logistics-fleet-type-edit-page.component';
import { LogisticsFleetTypeListPageComponent } from './pages/logistics-fleet-type-list-page/logistics-fleet-type-list-page.component';
import { LogisticsFleetTypeNewPageComponent } from './pages/logistics-fleet-type-new-page/logistics-fleet-type-new-page.component';
import { LogisticsProviderDetailPageComponent } from './pages/logistics-provider-detail-page/logistics-provider-detail-page.component';
import { LogisticsProviderListPageComponent } from './pages/logistics-provider-list-page/logistics-provider-list-page.component';
import { LogisticsProviderNewPageComponent } from './pages/logistics-provider-new-page/logistics-provider-new-page.component';
import { LogisticsProviderDetailResolver } from './pages/resolvers/logistics-provider-detail.resolver';
import { DeliveryOrderDetailComponent } from './pages/delivery-order-detail/delivery-order-detail.component';
import { DeliveryOrderDetailResolver } from './pages/resolvers/delivery-order-detail.resolver';

const routes: Routes = [

  {
    path: 'logistics/fleet-type',
    children: [
      { path: 'new', component: LogisticsFleetTypeNewPageComponent },

      { path: 'detail/:uid', component: LogisticsFleetTypeDetailPageComponent },

      { path: 'list', component: LogisticsFleetTypeListPageComponent },

      { path: 'edit/:uid', component: LogisticsFleetTypeEditPageComponent },
    ]
  },
  {
    path: 'logistics/provider',
    children: [
      { path: 'new', component: LogisticsProviderNewPageComponent },

      { path: 'detail/:uid', component: LogisticsProviderDetailPageComponent, resolve: { data: LogisticsProviderDetailResolver } },

      { path: 'list', component: LogisticsProviderListPageComponent },

      { path: 'delivery-order/:uid', component: DeliveryOrderDetailComponent, resolve: { deliveryOrder: DeliveryOrderDetailResolver } },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule { }

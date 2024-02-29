import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticsRoutingModule } from './logistics-routing.module';
import { LogisticsFleetTypeNewPageComponent } from './pages/logistics-fleet-type-new-page/logistics-fleet-type-new-page.component';
import { LogisticsFleetTypeListPageComponent } from './pages/logistics-fleet-type-list-page/logistics-fleet-type-list-page.component';
import { LogisticsFleetTypeEditPageComponent } from './pages/logistics-fleet-type-edit-page/logistics-fleet-type-edit-page.component';
import { LogisticsFleetTypeDetailPageComponent } from './pages/logistics-fleet-type-detail-page/logistics-fleet-type-detail-page.component';
import { UiModule } from '@hacienda-platform/ui';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { LogisticsProviderNewPageComponent } from './pages/logistics-provider-new-page/logistics-provider-new-page.component';
import { LogisticsProviderListPageComponent } from './pages/logistics-provider-list-page/logistics-provider-list-page.component';
import { LogisticsProviderDetailPageComponent } from './pages/logistics-provider-detail-page/logistics-provider-detail-page.component';
import { DeliveryOrderDetailComponent } from './pages/delivery-order-detail/delivery-order-detail.component';

@NgModule({
  declarations: [
    LogisticsFleetTypeNewPageComponent,
    LogisticsFleetTypeListPageComponent,
    LogisticsFleetTypeEditPageComponent,
    LogisticsFleetTypeDetailPageComponent,
    LogisticsProviderNewPageComponent,
    LogisticsProviderListPageComponent,
    LogisticsProviderDetailPageComponent,
    DeliveryOrderDetailComponent
  ],
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService]
})
export class LogisticsModule {}

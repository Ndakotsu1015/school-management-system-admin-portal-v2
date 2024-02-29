import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListPageComponent } from './pages/customer-list-page/customer-list-page.component';
import { CustomerDetailPageComponent } from './pages/customer-detail-page/customer-detail-page.component';
import { UiModule } from '@hacienda-platform/ui';

@NgModule({
  declarations: [CustomerListPageComponent, CustomerDetailPageComponent],
  imports: [CommonModule, CustomerRoutingModule, UiModule],
})
export class CustomerModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardElementsComponent } from './dashboard-elements/dashboard-elements.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardElementsComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [DashboardElementsComponent]
})
export class SharedModule {}

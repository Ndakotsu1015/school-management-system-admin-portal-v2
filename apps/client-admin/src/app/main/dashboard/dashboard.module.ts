import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { UiModule } from '@hacienda-platform/ui';
import { AppLayoutModule } from '../layout/app-layout.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, FormsModule, DashboardRoutingModule, UiModule, AppLayoutModule, SharedModule],
})
export class DashboardModule { }

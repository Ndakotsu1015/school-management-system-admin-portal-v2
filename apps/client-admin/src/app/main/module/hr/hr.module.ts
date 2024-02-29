import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrStaffListPageComponent } from './pages/hr-staff-list-page/hr-staff-list-page.component';
import { HrStaffDetailPageComponent } from './pages/hr-staff-detail-page/hr-staff-detail-page.component';
import { UiModule } from '@hacienda-platform/ui';
import { HrStaffNewPageComponent } from './pages/hr-staff-new-page/hr-staff-new-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    HrStaffListPageComponent,
    HrStaffDetailPageComponent,
    HrStaffNewPageComponent,
    // ConfirmDialogModule,
    // ConfirmPopupModule

  ],
  imports: [CommonModule, HrRoutingModule, UiModule, ReactiveFormsModule],

  providers:[
    ConfirmationService
  ]
})
export class HrModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { UserNewPageComponent } from './pages/user-new-page/user-new-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@hacienda-platform/ui';
import { ConfirmationService } from 'primeng/api';
import { UserGroupListPageComponent } from './pages/user-group-list-page/user-group-list-page.component';
import { UserGroupDetailPageComponent } from './pages/user-group-detail-page/user-group-detail-page.component';
import { UserGroupNewPageComponent } from './pages/user-group-new-page/user-group-new-page.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserDetailPageComponent,
    UserNewPageComponent,
    UserGroupListPageComponent,
    UserGroupDetailPageComponent,
    UserGroupNewPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService]
})
export class UserModule {}

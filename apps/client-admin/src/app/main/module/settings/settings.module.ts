import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { DeliverySettingsPageComponent } from './pages/delivery-settings-page/delivery-settings-page.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { UiModule } from '@hacienda-platform/ui';

@NgModule({
  declarations: [DeliverySettingsPageComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiModule,
  ]
})
export class SettingsModule { }

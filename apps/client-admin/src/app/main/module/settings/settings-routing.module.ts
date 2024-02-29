import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverySettingsPageComponent } from './pages/delivery-settings-page/delivery-settings-page.component';
import { MeasuringUnitComponent } from './pages/measuring-unit/measuring-unit.component';


const routes: Routes = [
  {
    path: 'general-settings',
    children: [
      { path: 'delivery-settings', component: DeliverySettingsPageComponent },
    ]
  },

  {
    path: 'measuring',
    children: [
      { path: 'measuring-units', component: MeasuringUnitComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

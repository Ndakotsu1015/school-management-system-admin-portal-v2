import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrStaffDetailPageComponent } from './pages/hr-staff-detail-page/hr-staff-detail-page.component';
import { HrStaffListPageComponent } from './pages/hr-staff-list-page/hr-staff-list-page.component';
import { HrStaffNewPageComponent } from './pages/hr-staff-new-page/hr-staff-new-page.component';

const routes: Routes = [
  {
    path: 'staff',
    children: [
      { path: 'list', component: HrStaffListPageComponent },
      { path: 'detail/:uid', component: HrStaffDetailPageComponent },
      { path: 'new', component: HrStaffNewPageComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }

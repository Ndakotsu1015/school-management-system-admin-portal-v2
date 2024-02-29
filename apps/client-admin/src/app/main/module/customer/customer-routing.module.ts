import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailPageComponent } from './pages/customer-detail-page/customer-detail-page.component';
import { CustomerListPageComponent } from './pages/customer-list-page/customer-list-page.component';
import { CustomerDetailResolver } from './resolvers/customer-detail.resolver';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      { path: 'list', component: CustomerListPageComponent },
      { path: 'detail/:uid', component: CustomerDetailPageComponent, resolve: { records: CustomerDetailResolver }, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

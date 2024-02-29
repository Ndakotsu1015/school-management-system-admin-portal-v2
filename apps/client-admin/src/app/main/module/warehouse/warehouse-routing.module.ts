import { WarehouseNewComponent } from './pages/warehouse-new/warehouse-new.component';
import { WarehouseDetailComponent } from './pages/warehouse-detail/warehouse-detail.component';
import { WarehouseListComponent } from './pages/warehouse-list/warehouse-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseOwnerComponent } from './pages/warehouse-owner/warehouse-owner.component';
import { WarehouseOwnerNewComponent } from './pages/warehouse-owner-new/warehouse-owner-new.component';
import { WarehouseOwnerDetailComponent } from './pages/warehouse-owner-detail/warehouse-owner-detail.component';
import { WarehouseCommodityStockListPageComponent } from './pages/warehouse-commodity-stock-list-page/warehouse-commodity-stock-list-page.component';
import { WarehouseCommodityStockDetailPageComponent } from './pages/warehouse-commodity-stock-detail-page/warehouse-commodity-stock-detail-page.component';
import { WarehouseCommodityStockEntryListPageComponent } from './pages/warehouse-commodity-stock-entry-list-page/warehouse-commodity-stock-entry-list-page.component';
import { WarehouseCommodityStockEntryDetailPageComponent } from './pages/warehouse-commodity-stock-entry-detail-page/warehouse-commodity-stock-entry-detail-page.component';
// import { WarehouseCommodityStockEntryNewPageComponent } from './pages/warehouse-commodity-stock-entry-new-page/warehouse-commodity-stock-entry-new-page.component';
import { WarehouseCommodityStockNewPageComponent } from './pages/warehouse-commodity-stock-new-page/warehouse-commodity-stock-new-page.component';
import { StockDetailResolver } from './resolver/stock-detail.resolve';
import { WarehouseOwnerDetailResolver } from './resolver/warehouse-owner-detail.resolver';

const routes: Routes = [
  {
    path: 'warehouse',
    children: [
      { path: 'list', component: WarehouseListComponent },
      { path: 'new', component: WarehouseNewComponent },
      {
        path: 'detail/:uid',
        component: WarehouseDetailComponent
      },
      {
        path: 'owner/list',
        component: WarehouseOwnerComponent
      },
      {
        path: 'owner/new',
        component: WarehouseOwnerNewComponent
      },
      {
        path: 'owner/detail/:uid',
        component: WarehouseOwnerDetailComponent,
        resolve: { data: WarehouseOwnerDetailResolver },
      },
      {
        path: 'commodity-stock',
        children: [
          {
            path: 'list',
            component:
              WarehouseCommodityStockListPageComponent
          },
          {
            path: 'detail/:uid',
            component:
              WarehouseCommodityStockDetailPageComponent,
            resolve: { record: StockDetailResolver }
          },
          {
            path: 'new',
            component:
              WarehouseCommodityStockNewPageComponent
          },
          {
            path: 'entry',
            children: [
              { path: 'list', component: WarehouseCommodityStockEntryListPageComponent },
              { path: 'detail/:uid', component: WarehouseCommodityStockEntryDetailPageComponent },
              // { path: 'new', component: WarehouseCommodityStockEntryNewPageComponent },
            ],
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }

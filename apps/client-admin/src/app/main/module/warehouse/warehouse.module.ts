import { WarehouseRoutingModule } from './warehouse-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { WarehouseDetailComponent } from './pages/warehouse-detail/warehouse-detail.component';
import { WarehouseNewComponent } from './pages/warehouse-new/warehouse-new.component';
import { WarehouseOwnerComponent } from './pages/warehouse-owner/warehouse-owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@hacienda-platform/ui';
import { WarehouseOwnerNewComponent } from './pages/warehouse-owner-new/warehouse-owner-new.component';
import { WarehouseListComponent } from './pages/warehouse-list/warehouse-list.component';
import { ConfirmationService } from 'primeng/api';
import { WarehouseOwnerDetailComponent } from './pages/warehouse-owner-detail/warehouse-owner-detail.component';
import { WarehouseCommodityStockListPageComponent } from './pages/warehouse-commodity-stock-list-page/warehouse-commodity-stock-list-page.component';
import { WarehouseCommodityStockDetailPageComponent } from './pages/warehouse-commodity-stock-detail-page/warehouse-commodity-stock-detail-page.component';
import { WarehouseCommodityStockEntryListPageComponent } from './pages/warehouse-commodity-stock-entry-list-page/warehouse-commodity-stock-entry-list-page.component';
import { WarehouseCommodityStockEntryDetailPageComponent } from './pages/warehouse-commodity-stock-entry-detail-page/warehouse-commodity-stock-entry-detail-page.component';
// import { WarehouseCommodityStockEntryNewPageComponent } from './pages/warehouse-commodity-stock-entry-new-page/warehouse-commodity-stock-entry-new-page.component';
import { WarehouseCommodityStockNewPageComponent } from './pages/warehouse-commodity-stock-new-page/warehouse-commodity-stock-new-page.component';
import { environment } from 'apps/client-admin/src/environments/environment';

@NgModule({
  declarations: [
    WarehouseDetailComponent,
    WarehouseNewComponent,
    WarehouseOwnerNewComponent,
    WarehouseOwnerComponent,
    WarehouseListComponent,
    WarehouseOwnerDetailComponent,
    WarehouseCommodityStockListPageComponent,
    WarehouseCommodityStockDetailPageComponent,
    WarehouseCommodityStockEntryListPageComponent,
    WarehouseCommodityStockEntryDetailPageComponent,
    // WarehouseCommodityStockEntryNewPageComponent,
    WarehouseCommodityStockNewPageComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    GooglePlaceModule,
    WarehouseRoutingModule,
    ReactiveFormsModule,
    UiModule
  ],
  providers: [
    ConfirmationService,
    {
      provide: 'googleMapsApiKey',
      useValue: environment.googleMapsApiKey
    }
  ]
})
export class WarehouseModule { }

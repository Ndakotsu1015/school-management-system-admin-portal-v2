import { ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommodityRoutingModule } from './commodity-routing.module';
import { CommodityCategoryNewPageComponent } from './pages/category/commodity-category-new-page/commodity-category-new-page.component';
import { CommodityCategoryListPageComponent } from './pages/category/commodity-category-list-page/commodity-category-list-page.component';
import { CommodityCategoryDetailPageComponent } from './pages/category/commodity-category-detail-page/commodity-category-detail-page.component';
import { CommodityItemListPageComponent } from './pages/item/commodity-item-list-page/commodity-item-list-page.component';
import { CommodityItemDetailPageComponent } from './pages/item/commodity-item-detail-page/commodity-item-detail-page.component';
import { CommodityItemNewPageComponent } from './pages/item/commodity-item-new-page/commodity-item-new-page.component';
import { CommodityVariantListPageComponent } from './pages/variant/commodity-variant-list-page/commodity-variant-list-page.component';
import { CommodityVariantDetailPageComponent } from './pages/variant/commodity-variant-detail-page/commodity-variant-detail-page.component';
import { CommodityVariantNewPageComponent } from './pages/variant/commodity-variant-new-page/commodity-variant-new-page.component';
import { UiModule } from '@hacienda-platform/ui';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    CommodityCategoryNewPageComponent,
    CommodityCategoryListPageComponent,
    CommodityCategoryDetailPageComponent,
    CommodityItemListPageComponent,
    CommodityItemDetailPageComponent,
    CommodityItemNewPageComponent,
    CommodityVariantListPageComponent,
    CommodityVariantDetailPageComponent,
    CommodityVariantNewPageComponent
  ],
  imports: [
    CommonModule,
    CommodityRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class CommodityModule { }

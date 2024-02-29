import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityCategoryDetailPageComponent } from './pages/category/commodity-category-detail-page/commodity-category-detail-page.component';
import { CommodityCategoryListPageComponent } from './pages/category/commodity-category-list-page/commodity-category-list-page.component';
import { CommodityCategoryNewPageComponent } from './pages/category/commodity-category-new-page/commodity-category-new-page.component';
import { CommodityItemDetailPageComponent } from './pages/item/commodity-item-detail-page/commodity-item-detail-page.component';
import { CommodityItemListPageComponent } from './pages/item/commodity-item-list-page/commodity-item-list-page.component';
import { CommodityItemNewPageComponent } from './pages/item/commodity-item-new-page/commodity-item-new-page.component';
import { CategoryDetailResolver } from './pages/resolvers/category-detail.resolver';
import { CommodityVariantDetailPageComponent } from './pages/variant/commodity-variant-detail-page/commodity-variant-detail-page.component';
import { CommodityVariantListPageComponent } from './pages/variant/commodity-variant-list-page/commodity-variant-list-page.component';
import { CommodityVariantNewPageComponent } from './pages/variant/commodity-variant-new-page/commodity-variant-new-page.component';

const routes: Routes = [
  {
    path: 'category',
    children: [
      {
        path: 'list',
        component: CommodityCategoryListPageComponent
      },
      {
        path: 'detail/:uid',
        component: CommodityCategoryDetailPageComponent,
        resolve: { record: CategoryDetailResolver }
      },
      {
        path: 'new',
        component: CommodityCategoryNewPageComponent
      }
    ]
  },
  {
    path: 'item',
    children: [
      {
        path: 'list',
        component: CommodityItemListPageComponent
      },
      {
        path: 'detail/:uid',
        component: CommodityItemDetailPageComponent
      },
      {
        path: 'new',
        component: CommodityItemNewPageComponent
      }
    ]
  },
  {
    path: 'variant',
    children: [
      {
        path: 'list',
        component: CommodityVariantListPageComponent
      },
      {
        path: 'detail/:uid',
        component: CommodityVariantDetailPageComponent
      },
      {
        path: 'new',
        component: CommodityVariantNewPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }

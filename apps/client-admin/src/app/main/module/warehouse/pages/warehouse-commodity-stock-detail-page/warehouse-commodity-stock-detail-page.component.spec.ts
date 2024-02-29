import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehouseCommodityStockDetailPageComponent } from './warehouse-commodity-stock-detail-page.component';

describe('WarehouseCommodityStockDetailPageComponent', () => {
  let component: WarehouseCommodityStockDetailPageComponent;
  let fixture: ComponentFixture<WarehouseCommodityStockDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarehouseCommodityStockDetailPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehouseCommodityStockDetailPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

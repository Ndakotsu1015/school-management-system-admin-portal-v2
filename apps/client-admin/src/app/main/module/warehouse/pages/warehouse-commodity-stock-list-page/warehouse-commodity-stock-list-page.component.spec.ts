import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehouseCommodityStockListPageComponent } from './warehouse-commodity-stock-list-page.component';

describe('WarehouseCommodityStockListPageComponent', () => {
  let component: WarehouseCommodityStockListPageComponent;
  let fixture: ComponentFixture<WarehouseCommodityStockListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarehouseCommodityStockListPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehouseCommodityStockListPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

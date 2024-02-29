import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehouseCommodityStockNewPageComponent } from './warehouse-commodity-stock-new-page.component';

describe('WarehouseCommodityStockNewPageComponent', () => {
  let component: WarehouseCommodityStockNewPageComponent;
  let fixture: ComponentFixture<WarehouseCommodityStockNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarehouseCommodityStockNewPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehouseCommodityStockNewPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

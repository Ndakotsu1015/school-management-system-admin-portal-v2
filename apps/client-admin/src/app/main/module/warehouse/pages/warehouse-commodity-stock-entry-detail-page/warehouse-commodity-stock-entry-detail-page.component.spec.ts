import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehouseCommodityStockEntryDetailPageComponent } from './warehouse-commodity-stock-entry-detail-page.component';

describe('WarehouseCommodityStockEntryDetailPageComponent', () => {
  let component: WarehouseCommodityStockEntryDetailPageComponent;
  let fixture: ComponentFixture<WarehouseCommodityStockEntryDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarehouseCommodityStockEntryDetailPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehouseCommodityStockEntryDetailPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

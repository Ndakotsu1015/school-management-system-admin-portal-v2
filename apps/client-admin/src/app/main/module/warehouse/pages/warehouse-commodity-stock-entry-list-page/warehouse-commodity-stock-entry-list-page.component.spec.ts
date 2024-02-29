import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { WarehouseCommodityStockEntryListPageComponent } from './warehouse-commodity-stock-entry-list-page.component';

describe('WarehouseCommodityStockEntryListPageComponent', () => {
  let component: WarehouseCommodityStockEntryListPageComponent;
  let fixture: ComponentFixture<WarehouseCommodityStockEntryListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarehouseCommodityStockEntryListPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      WarehouseCommodityStockEntryListPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

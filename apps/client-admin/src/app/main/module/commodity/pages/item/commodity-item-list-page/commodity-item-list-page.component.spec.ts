import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityItemListPageComponent } from './commodity-item-list-page.component';

describe('CommodityItemListPageComponent', () => {
  let component: CommodityItemListPageComponent;
  let fixture: ComponentFixture<CommodityItemListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityItemListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityItemListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

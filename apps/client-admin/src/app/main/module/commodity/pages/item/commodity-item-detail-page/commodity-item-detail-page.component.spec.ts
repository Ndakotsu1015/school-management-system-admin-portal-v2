import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityItemDetailPageComponent } from './commodity-item-detail-page.component';

describe('CommodityItemDetailPageComponent', () => {
  let component: CommodityItemDetailPageComponent;
  let fixture: ComponentFixture<CommodityItemDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityItemDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityItemDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

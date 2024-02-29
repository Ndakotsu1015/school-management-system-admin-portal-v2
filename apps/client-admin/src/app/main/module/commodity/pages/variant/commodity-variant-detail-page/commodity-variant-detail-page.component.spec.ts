import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityVariantDetailPageComponent } from './commodity-variant-detail-page.component';

describe('CommodityVariantDetailPageComponent', () => {
  let component: CommodityVariantDetailPageComponent;
  let fixture: ComponentFixture<CommodityVariantDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityVariantDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityVariantDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

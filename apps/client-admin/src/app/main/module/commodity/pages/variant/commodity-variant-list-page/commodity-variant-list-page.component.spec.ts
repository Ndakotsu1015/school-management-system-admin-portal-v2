import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityVariantListPageComponent } from './commodity-variant-list-page.component';

describe('CommodityVariantListPageComponent', () => {
  let component: CommodityVariantListPageComponent;
  let fixture: ComponentFixture<CommodityVariantListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityVariantListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityVariantListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

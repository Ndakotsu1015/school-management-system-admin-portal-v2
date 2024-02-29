import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityVariantNewPageComponent } from './commodity-variant-new-page.component';

describe('CommodityVariantNewPageComponent', () => {
  let component: CommodityVariantNewPageComponent;
  let fixture: ComponentFixture<CommodityVariantNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityVariantNewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityVariantNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

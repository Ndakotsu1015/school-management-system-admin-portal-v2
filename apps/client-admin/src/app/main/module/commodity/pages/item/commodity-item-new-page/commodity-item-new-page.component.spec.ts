import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityItemNewPageComponent } from './commodity-item-new-page.component';

describe('CommodityItemNewPageComponent', () => {
  let component: CommodityItemNewPageComponent;
  let fixture: ComponentFixture<CommodityItemNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityItemNewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityItemNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

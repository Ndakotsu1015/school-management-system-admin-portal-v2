import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCategoryDetailPageComponent } from './commodity-category-detail-page.component';

describe('CommodityCategoryDetailPageComponent', () => {
  let component: CommodityCategoryDetailPageComponent;
  let fixture: ComponentFixture<CommodityCategoryDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityCategoryDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityCategoryDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCategoryListPageComponent } from './commodity-category-list-page.component';

describe('CommodityCategoryListPageComponent', () => {
  let component: CommodityCategoryListPageComponent;
  let fixture: ComponentFixture<CommodityCategoryListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityCategoryListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityCategoryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCategoryNewPageComponent } from './commodity-category-new-page.component';

describe('CommodityCategoryNewPageComponent', () => {
  let component: CommodityCategoryNewPageComponent;
  let fixture: ComponentFixture<CommodityCategoryNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommodityCategoryNewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommodityCategoryNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

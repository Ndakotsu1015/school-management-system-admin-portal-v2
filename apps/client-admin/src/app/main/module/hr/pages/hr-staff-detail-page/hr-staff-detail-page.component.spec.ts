import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrStaffDetailPageComponent } from './hr-staff-detail-page.component';

describe('HrStaffDetailPageComponent', () => {
  let component: HrStaffDetailPageComponent;
  let fixture: ComponentFixture<HrStaffDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrStaffDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HrStaffDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

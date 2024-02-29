import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrStaffListPageComponent } from './hr-staff-list-page.component';

describe('HrStaffListPageComponent', () => {
  let component: HrStaffListPageComponent;
  let fixture: ComponentFixture<HrStaffListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrStaffListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HrStaffListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

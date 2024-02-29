import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrStaffNewPageComponent } from './hr-staff-new-page.component';

describe('HrStaffNewPageComponent', () => {
  let component: HrStaffNewPageComponent;
  let fixture: ComponentFixture<HrStaffNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrStaffNewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HrStaffNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

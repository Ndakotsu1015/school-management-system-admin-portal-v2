import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DeliveryVoucherComponent } from './delivery-voucher.component';

describe('DeliveryVoucherComponent', () => {
  let component: DeliveryVoucherComponent;
  let fixture: ComponentFixture<DeliveryVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryVoucherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      DeliveryVoucherComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

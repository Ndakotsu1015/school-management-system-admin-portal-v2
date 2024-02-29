import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { CustomerDeliveryOrderPageComponent } from './customer-delivery-order-page.component';

describe('CustomerDeliveryOrderPageComponent', () => {
  let component: CustomerDeliveryOrderPageComponent;
  let fixture: ComponentFixture<CustomerDeliveryOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDeliveryOrderPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      CustomerDeliveryOrderPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

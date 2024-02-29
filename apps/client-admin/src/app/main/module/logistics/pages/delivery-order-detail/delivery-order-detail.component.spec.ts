import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DeliveryOrderDetailComponent } from './delivery-order-detail.component';

describe('DeliveryOrderDetailComponent', () => {
  let component: DeliveryOrderDetailComponent;
  let fixture: ComponentFixture<DeliveryOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryOrderDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      DeliveryOrderDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

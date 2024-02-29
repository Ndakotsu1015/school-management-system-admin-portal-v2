import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderDetailPageComponent } from './customer-order-detail-page.component';

describe('CustomerOrderDetailPageComponent', () => {
  let component: CustomerOrderDetailPageComponent;
  let fixture: ComponentFixture<CustomerOrderDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

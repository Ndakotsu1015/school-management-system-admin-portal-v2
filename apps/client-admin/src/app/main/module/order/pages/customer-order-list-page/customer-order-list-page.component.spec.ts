import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderListPageComponent } from './customer-order-list-page.component';

describe('CustomerOrderListPageComponent', () => {
  let component: CustomerOrderListPageComponent;
  let fixture: ComponentFixture<CustomerOrderListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

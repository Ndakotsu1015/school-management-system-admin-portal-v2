import { TestBed } from '@angular/core/testing';

import { CustomerDetailResolver } from './customer-detail.resolver';

describe('CustomerDetailResolver', () => {
  let resolver: CustomerDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CustomerDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

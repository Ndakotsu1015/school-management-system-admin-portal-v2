import { TestBed } from '@angular/core/testing';

import { ForgotPasswordEndResolver } from './forgot-password-end.resolver';

describe('ForgotPasswordEndResolver', () => {
  let resolver: ForgotPasswordEndResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ForgotPasswordEndResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

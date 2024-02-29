import { TestBed } from '@angular/core/testing';

import { UserGroupDetailResolver } from './user-group-detail.resolver';

describe('UserGroupDetailResolver', () => {
  let resolver: UserGroupDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserGroupDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserGroupListResolver } from './user-group-list.resolver';

describe('UserGroupListResolver', () => {
  let resolver: UserGroupListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserGroupListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoginactivateguardGuard } from './loginactivateguard.guard';

describe('LoginactivateguardGuard', () => {
  let guard: LoginactivateguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginactivateguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

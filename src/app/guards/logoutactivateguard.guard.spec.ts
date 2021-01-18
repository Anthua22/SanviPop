import { TestBed } from '@angular/core/testing';

import { LogoutactivateguardGuard } from './logoutactivateguard.guard';

describe('LogoutactivateguardGuard', () => {
  let guard: LogoutactivateguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogoutactivateguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

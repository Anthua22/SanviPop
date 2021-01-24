import { TestBed } from '@angular/core/testing';

import { EditproductGuard } from './editproduct.guard';

describe('EditproductGuard', () => {
  let guard: EditproductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditproductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

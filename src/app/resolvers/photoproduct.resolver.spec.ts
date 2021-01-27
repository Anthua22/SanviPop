import { TestBed } from '@angular/core/testing';

import { PhotoproductResolver } from './photoproduct.resolver';

describe('PhotoproductResolver', () => {
  let resolver: PhotoproductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhotoproductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

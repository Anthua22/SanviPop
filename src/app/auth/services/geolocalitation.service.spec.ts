import { TestBed } from '@angular/core/testing';

import { GeolocalitationService } from './geolocalitation.service';

describe('GeolocalitationService', () => {
  let service: GeolocalitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocalitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

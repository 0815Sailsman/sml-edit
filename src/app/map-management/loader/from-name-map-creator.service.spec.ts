import { TestBed } from '@angular/core/testing';

import { FromNameMapCreatorService } from './from-name-map-creator.service';

describe('FromNameMapCreatorService', () => {
  let service: FromNameMapCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromNameMapCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

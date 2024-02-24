import { TestBed } from '@angular/core/testing';

import { AbstractMapLoaderService } from './abstract-map-loader.service';

describe('MapLoaderService', () => {
  let service: AbstractMapLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractMapLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

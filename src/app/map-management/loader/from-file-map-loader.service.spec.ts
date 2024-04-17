import { TestBed } from '@angular/core/testing';

import { FromFileMapLoaderService } from './from-file-map-loader.service';

describe('FromFileMapLoaderService', () => {
  let service: FromFileMapLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromFileMapLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});

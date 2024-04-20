import { TestBed } from '@angular/core/testing';
import { Map } from '../map';
import { FromFileMapLoaderService } from './from-file-map-loader.service';
import {aComplexMapAsJSON, aComplexMapAsParsedAndActualMap} from "../../test/test-factories/mapFactory";

describe('FromFileMapLoaderService', () => {
  let service: FromFileMapLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromFileMapLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('properly parses and loads complex map as text file (json)', () => {
    const unparsedJson: string = aComplexMapAsJSON();
    const parsed: Map | undefined = service.loadFromString(unparsedJson);

    const expected: Map = aComplexMapAsParsedAndActualMap();

    expect(parsed).not.toBe(undefined);
    expect(expected).toEqual(parsed!);
  });
});

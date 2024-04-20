import {TestBed} from '@angular/core/testing';

import {FileParserService} from './file-parser.service';
import {UnparsedArea} from "./interfaces/UnparsedArea";
import {Area} from "../../../model/area";
import {Connection} from "../../../model/connection";
import {Location} from "../../../model/location";
import {ConditionSubjects} from "../../../builders/condition-builder/ConditionSubjects";
import {ConditionVerb} from "../../../model/ConditionVerb";
import {Item} from "../../../model/item";
import {Enemy} from "../../../model/enemy";
import {OtherObject} from "../../../model/otherObject";
import {NPC} from "../../../model/NPC";
import {aComplexMapAsObject, aComplexMapAsParsedAndActualMap} from "../../../test/test-factories/mapFactory";

describe('FileParserService', () => {
  let service: FileParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('correctly parses a complex unparsedMap with many conditions', () => {
    const unparsedAreas: UnparsedArea[] = aComplexMapAsObject().areas;

    const expected: Area[] = aComplexMapAsParsedAndActualMap().areas;

    expect(expected).toEqual(service.parseAreas(unparsedAreas));
  });
});

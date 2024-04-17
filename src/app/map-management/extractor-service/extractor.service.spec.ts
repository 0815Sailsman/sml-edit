import { TestBed } from '@angular/core/testing';
import {Map} from "../map";
import { ExtractorService } from './extractor.service';
import {Area} from "../../model/area";
import {Location} from "../../model/location";
import {
  aLocationWith,
  aLocationWithoutAnything, anotherLocationWith,
  anotherLocationWithoutAnything
} from "../../test/test-factories/locationsFactory";
import {Connection} from "../../model/connection";
import {Item} from "../../model/item";
import {anItem, anotherItem, aThirdItem} from "../../test/test-factories/itemsFactory";
import {anEnemyDropping} from "../../test/test-factories/enemiesFactory";
import {anNPCSelling} from "../../test/test-factories/npcFactory";

describe('ExtractorService', () => {
  let service: ExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('extracts locations correctly', () => {
    const locationsA: Location[] = [aLocationWithoutAnything()];
    const locationsB: Location[] = [anotherLocationWithoutAnything()];
    const allLocations: Location[] = locationsA.concat(locationsB);

    const areas: Area[] = [
      new Area (0, "area0Name", locationsA),
      new Area(1, "area1Name", locationsB),
      new Area(2, "area2Name", [])
    ];

    const sampleMap = new Map(
      "sample map",
      areas,
      []
    );

    expect(service.allLocations(sampleMap)).toEqual(allLocations);
  });

  it('extracts connections correctly', () => {
    const connectionsA: Connection[] = [new Connection(0, 1)]
    const connectionsB: Connection[] = [new Connection(1, 0)]
    const allConnections: Connection[] = connectionsA.concat(connectionsB);

    const locationsA: Location[] = [aLocationWith({connections:connectionsA})];
    const locationsB: Location[] = [anotherLocationWith({connections:connectionsB})];

    const areas: Area[] = [
      new Area(0, "area0Name", locationsA),
      new Area(1, "area1Name", locationsB),
      new Area(2, "area2Name", [])
    ];

    const sampleMap = new Map(
      "sample map",
      areas,
      []
    );

    expect(service.allConnections(sampleMap)).toEqual(allConnections);
  });

  it('extracts items correctly', () => {
    const locationItem: Item = anItem();
    const enemyItem: Item = anotherItem();
    const npcItem: Item = aThirdItem();
    const allItems: Item[] = new Array<Item>().concat(locationItem).concat(enemyItem).concat(npcItem);

    const locationA: Location = aLocationWith({
      items:[locationItem]
    });
    const locationB: Location = anotherLocationWith({
      enemies: [anEnemyDropping([{item:enemyItem, chance: 100}])],
      npcs: [anNPCSelling([{item:npcItem, cost:1, count:1}])]
    });

    const areas: Area[] = [
      new Area(0, "area0Name", [locationA]),
      new Area(1, "area1Name", [locationB]),
      new Area(2, "area2Name", [])
    ];

    const sampleMap = new Map(
      "sample map",
      areas,
      []
    );

    expect(service.allItems(sampleMap)).toEqual(allItems);
  });
});

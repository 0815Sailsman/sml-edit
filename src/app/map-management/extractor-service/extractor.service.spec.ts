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
import {anEnemy, anEnemyDropping, anotherEnemy} from "../../test/test-factories/enemiesFactory";
import {anNPC, anNPCSelling, anotherNPC} from "../../test/test-factories/npcFactory";
import {OtherObject} from "../../model/otherObject";
import {anOtherObjects, anotherOtherObjects} from "../../test/test-factories/otherObjectFactory";
import {anItemType, anotherItemType} from "../../test/test-factories/itemTypeFactory";
import {ItemType} from "../../model/itemType";

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
    const allConnections: Connection[] = [new Connection(0, 1), new Connection(1, 0)];

    const locationsA: Location[] = [aLocationWith({connections:[allConnections[0]]})];
    const locationsB: Location[] = [anotherLocationWith({connections:[allConnections[1]]})];

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
    const allItems: Item[] = [anItem(), anotherItem(), aThirdItem()];

    const locationA: Location = aLocationWith({
      items:[allItems[0]]
    });
    const locationB: Location = anotherLocationWith({
      enemies: [anEnemyDropping([{item:allItems[1], chance: 100}])],
      npcs: [anNPCSelling([{item:allItems[2], cost:1, count:1}])]
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

  it('extracts enemies correctly', () => {
    const allEnemies = [anEnemy(), anotherEnemy()];

    const locationA: Location = aLocationWith({
      enemies: [allEnemies[0]]
    });
    const locationB: Location = anotherLocationWith({
      enemies: [allEnemies[1]]
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

    expect(service.allEnemies(sampleMap)).toEqual(allEnemies);
  });

  it('extracts NPCs correctly', () => {
    const allNPCs = [anNPC(), anotherNPC()];

    const locationA: Location = aLocationWith({
      npcs: [allNPCs[0]]
    });
    const locationB: Location = anotherLocationWith({
      npcs: [allNPCs[1]]
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

    expect(service.allNPCs(sampleMap)).toEqual(allNPCs);
  });

  it('extracts otherObjects correctly', () => {
    const allObjects: OtherObject[] = [anOtherObjects(), anotherOtherObjects()];

    const locationA: Location = aLocationWith({
      objects: [allObjects[0]]
    });
    const locationB: Location = anotherLocationWith({
      objects: [allObjects[1]]
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

    expect(service.allOtherObjects(sampleMap)).toEqual(allObjects);
  });

  it('extracts itemTypes correctly', () => {
    const allItemTypes: ItemType[] = [anItemType(), anotherItemType()];

    const sampleMap = new Map(
      "sample map",
      [],
      allItemTypes
    );

    expect(service.allItemTypes(sampleMap)).toEqual(allItemTypes);
  });
});

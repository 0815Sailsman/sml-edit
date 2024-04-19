import { TestBed } from '@angular/core/testing';

import { IdManagerService } from './id-manager.service';
import {ExtractorService} from "./extractor-service/extractor.service";
import {Location} from "../model/location";
import {Map} from "./map";
import {Area} from "../model/area";
import {anItemType, anotherItemType} from "../test/test-factories/itemTypeFactory";
import {aLocationWith, anotherLocationWith} from "../test/test-factories/locationsFactory";
import {Connection} from "../model/connection";
import {Item} from "../model/item";
import {anItem, anotherItem} from "../test/test-factories/itemsFactory";
import {anEnemy, anotherEnemy} from "../test/test-factories/enemiesFactory";
import {anNPC, anotherNPC} from "../test/test-factories/npcFactory";
import {anOtherObjects, anotherOtherObjects} from "../test/test-factories/otherObjectFactory";

describe('IdManagerService', () => {

  let idManagerService: IdManagerService;
  let extractorService: ExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    idManagerService = TestBed.inject(IdManagerService);
    extractorService = TestBed.inject(ExtractorService);
  });

  it('should be created', () => {
    expect(idManagerService).toBeTruthy();
  });

  it('inits all IDs as -1 by default', () => {
    const sampleMap: Map = new Map(
      "sampleMap",
      [],
      []
    );

    idManagerService.initIDsFromMap(sampleMap);

    expect(idManagerService.areaID).toEqual(-1);
    expect(idManagerService.locationID).toEqual(-1);
    expect(idManagerService.connectionID).toEqual(-1);
    expect(idManagerService.itemID).toEqual(-1);
    expect(idManagerService.enemyID).toEqual(-1);
    expect(idManagerService.objectID).toEqual(-1);
    expect(idManagerService.npcID).toEqual(-1);
    expect(idManagerService.itemTypeID).toEqual(-1);
  });

  it('inits all IDs as 1 when 1 was the biggest id in that category', () => {
    const sampleMap: Map = new Map(
      "sampleMap",
      [
        new Area(
          0,
          "area0",
          [aLocationWith({
            connections: [new Connection(0, 1)],
            items: [anItem()],
            enemies: [anEnemy()],
            npcs: [anNPC()],
            objects: [anOtherObjects()]
            })]
        ),
        new Area(
          1,
          "area1",
          [anotherLocationWith({
            connections: [new Connection(1, 0)],
            items: [anotherItem()],
            enemies: [anotherEnemy()],
            npcs: [anotherNPC()],
            objects: [anotherOtherObjects()]
          })]
          )
      ],
      [
        anItemType(),
        anotherItemType()
      ]
    );

    idManagerService.initIDsFromMap(sampleMap);

    expect(idManagerService.areaID).toEqual(1);
    expect(idManagerService.locationID).toEqual(1);
    expect(idManagerService.connectionID).toEqual(1);
    expect(idManagerService.itemID).toEqual(1);
    expect(idManagerService.enemyID).toEqual(1);
    expect(idManagerService.objectID).toEqual(1);
    expect(idManagerService.npcID).toEqual(1);
    expect(idManagerService.itemTypeID).toEqual(1);
  });

  it('properly increases the related ID when nextID is called', () => {
    const sampleMap: Map = new Map(
      "sampleMap",
      [
        new Area(
          0,
          "area0",
          [aLocationWith({
            connections: [new Connection(0, 1)],
            items: [anItem()],
            enemies: [anEnemy()],
            npcs: [anNPC()],
            objects: [anOtherObjects()]
          })]
        ),
        new Area(
          1,
          "area1",
          [anotherLocationWith({
            connections: [new Connection(1, 0)],
            items: [anotherItem()],
            enemies: [anotherEnemy()],
            npcs: [anotherNPC()],
            objects: [anotherOtherObjects()]
          })]
        )
      ],
      [
        anItemType(),
        anotherItemType()
      ]
    );

    idManagerService.initIDsFromMap(sampleMap);

    expect(idManagerService.nextAreaID()).toEqual(2);
    expect(idManagerService.nextLocationID()).toEqual(2);
    expect(idManagerService.nextConnectionID()).toEqual(2);
    expect(idManagerService.nextItemID()).toEqual(2);
    expect(idManagerService.nextEnemyID()).toEqual(2);
    expect(idManagerService.nextObjectID()).toEqual(2);
    expect(idManagerService.nextNPCID()).toEqual(2);
    expect(idManagerService.nextItemTypeID()).toEqual(2);

    expect(idManagerService.areaID).toEqual(2);
    expect(idManagerService.locationID).toEqual(2);
    expect(idManagerService.connectionID).toEqual(2);
    expect(idManagerService.itemID).toEqual(2);
    expect(idManagerService.enemyID).toEqual(2);
    expect(idManagerService.objectID).toEqual(2);
    expect(idManagerService.npcID).toEqual(2);
    expect(idManagerService.itemTypeID).toEqual(2);
  });
});

import { Injectable } from '@angular/core';
import { Map } from './map';
import {ExtractorService} from "./extractor-service/extractor.service";

@Injectable({
  providedIn: 'root'
})
export class IdManagerService {

  constructor(private extractor: ExtractorService) { }

  areaID: number = -1;
  locationID: number = -1;
  connectionID: number = -1;
  itemID: number = -1;
  enemyID: number = -1;
  objectID: number = -1;
  npcID: number = -1;
  itemTypeID: number = -1;

  initIDsFromMap(map: Map) {
    this.areaID = this.extractMaxID(map.areas);
    this.locationID = this.extractMaxID(this.extractor.allLocations(map));
    this.connectionID = this.extractMaxID(this.extractor.allConnections(map))
    this.itemID = this.extractMaxID(this.extractor.allItems(map));
    this.enemyID = this.extractMaxID(this.extractor.allEnemies(map));
    this.objectID = this.extractMaxID(this.extractor.allOtherObjects(map));
    this.npcID = this.extractMaxID(this.extractor.allNPCs(map));
    this.itemTypeID = this.extractMaxID(map.items);
  }

  extractMaxID(arrayWithID: HasID[]):number {
    const descendingly = (a: number, b: number) => {return b-a;};
    const sorted = arrayWithID.map(obj => obj.id).sort(descendingly);
    return sorted[0] ?? -1;
  }

  nextAreaID(): number {
    return ++this.areaID;
  }

  nextLocationID(): number {
    return ++this.locationID;
  }

  nextConnectionID(): number {
    return ++this.connectionID;
  }

  nextItemID(): number {
    return ++this.itemID;
  }

  nextEnemyID(): number {
    return ++this.enemyID;
  }

  nextObjectID(): number {
    return ++this.objectID;
  }

  nextNPCID(): number {
    return ++this.npcID;
  }

  nextItemTypeID(): number {
    return ++this.itemTypeID;
  }
}

interface HasID {
  id: number
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdManagerService {

  constructor() { }

  majorLocationID: number = 0;
  minorLocationID: number = 0;
  itemID: number = 0;
  enemyID: number = 0;
  objectID: number = 0;
  npcID: number = 0;
  itemTypeID: number = 0;

  nextMajorLocationID(): number {
    return ++this.majorLocationID;
  }

  nextMinorLocationID(): number {
    return ++this.minorLocationID;
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

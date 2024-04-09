import { Injectable } from '@angular/core';
import {Location} from "../location";
import {Item} from "../item";
import {Enemy} from "../enemy";
import {NPC} from "../NPC";
import {OtherObject} from "../otherObject";
import {ItemType} from "../itemType";
import {Map} from "../map";
import {Connection} from "../connection";
import {min} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExtractorService {

  constructor() { }

  allLocations(map: Map): Location[] {
    return map.areas.flatMap(area => area.locations);
  }

  allConnections(map: Map): Connection[] {
    return this.allLocations(map).flatMap(location => location.connections)
  }

  allItems(map: Map): Item[] {
    const locationItems = this.allLocations(map).flatMap(location => location.items);
    const enemyItems = this.allEnemies(map).flatMap(enemy => enemy.drops.flatMap(drop => drop.item));

    return [...locationItems, ...enemyItems];
  }

  allEnemies(map: Map): Enemy[] {
    return this.allLocations(map).flatMap(location => location.enemies);
  }

  allNPCs(map: Map): NPC[] {
    return this.allLocations(map).flatMap(location => location.npcs)
  }

  allOtherObjects(map: Map): OtherObject[] {
    return this.allLocations(map).flatMap(location => location.objects)
  }

  allItemTypes(map: Map): ItemType[] {
    return map.items;
  }
}

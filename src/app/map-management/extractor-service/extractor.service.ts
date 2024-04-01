import { Injectable } from '@angular/core';
import {Location} from "../location";
import {Item} from "../item";
import {Enemy} from "../enemy";
import {NPC} from "../NPC";
import {OtherObject} from "../otherObject";
import {ItemType} from "../itemType";
import {Map} from "../map";

@Injectable({
  providedIn: 'root'
})
export class ExtractorService {

  constructor() { }

  allMinorLocations(map: Map): Location[] {
    return map.locations.flatMap(major => major.subLocations);
  }

  allItems(map: Map): Item[] {
    const minorItems = this.allMinorLocations(map).flatMap(minor => minor.items);
    const enemyItems = this.allEnemies(map).flatMap(enemy => enemy.drops.flatMap(drop => drop.item));

    return [...minorItems, ...enemyItems];
  }

  allEnemies(map: Map): Enemy[] {
    return this.allMinorLocations(map).flatMap(minor => minor.enemies);
  }

  allNPCs(map: Map): NPC[] {
    return this.allMinorLocations(map).flatMap(minor => minor.npcs)
  }

  allOtherObjects(map: Map): OtherObject[] {
    return this.allMinorLocations(map).flatMap(minor => minor.objects)
  }

  allItemTypes(map: Map): ItemType[] {
    return map.items;
  }
}

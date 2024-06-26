import { Injectable } from '@angular/core';
import {Location} from "../../model/location";
import {Item} from "../../model/item";
import {Enemy} from "../../model/enemy";
import {NPC} from "../../model/NPC";
import {OtherObject} from "../../model/otherObject";
import {ItemType} from "../../model/itemType";
import {Map} from "../map";
import {Connection} from "../../model/connection";

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
    const shopItems = this.allNPCs(map).flatMap(npc => npc.shop.flatMap(shopItem => shopItem.item));

    return locationItems.concat(enemyItems).concat(shopItems);
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

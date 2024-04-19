import {Injectable} from '@angular/core';
import {Area} from "../../../model/area";
import {Location} from "../../../model/location";
import {Connection} from "../../../model/connection";
import {ItemType} from "../../../model/itemType";
import {Item} from "../../../model/item";
import {Drop} from "../../../model/drop";
import {Enemy} from "../../../model/enemy";
import {OtherObject} from "../../../model/otherObject";
import {NPC} from "../../../model/NPC";
import {ShopItem} from "../../../model/ShopItem";
import {BigCondition} from "../../../model/bigCondition";
import {AtomicCondition} from "../../../model/atomicCondition";
import {ConditionSubjects} from "../../../builders/condition-builder/ConditionSubjects";
import {ConditionVerb} from "../../../model/ConditionVerb";
import {UnparsedAtomicCondition} from "./interfaces/UnparsedAtomicCondition";
import {UnparsedBigCondition} from "./interfaces/UnparsedBigCondition";
import {UnparsedShopItem} from "./interfaces/UnparsedShopItem";
import {UnparsedNPC} from "./interfaces/UnparsedNPC";
import {UnparsedOtherObject} from "./interfaces/UnparsedOtherObject";
import {UnparsedEnemy} from "./interfaces/UnparsedEnemy";
import {UnparsedDrop} from "./interfaces/UnparsedDrop";
import {UnparsedItemType} from "./interfaces/UnparsedItemType";
import {UnparsedItem} from "./interfaces/UnparsedItem";
import {UnparsedConnection} from "./interfaces/UnparsedConnection";
import {UnparsedLocation} from "./interfaces/UnparsedLocation";
import {UnparsedArea} from "./interfaces/UnparsedArea";

@Injectable({
  providedIn: 'root'
})
export class FileParserService {

  constructor() { }

  public parseAreas(unparsedAreas: UnparsedArea[]): Area[] {
    return unparsedAreas.map(area => {
      return new Area(area.id, area.name, this.parseLocations(area.locations))
    });
  }

  public parseLocations(locations: UnparsedLocation[]): Location[] {
    return locations.map(location => {return new Location(
      location.id,
      location.name,
      this.parseConnections(location.connections),
      this.parseItems(location.items),
      this.parseEnemies(location.enemies),
      this.parseObjects(location.objects),
      this.parseNPCs(location.npcs)
    )})
  }

  public parseConnections(connections: UnparsedConnection[]): Connection[] {
    return connections.map(connection => {return new Connection(
      connection.id,
      connection.to,
      connection.availableIf == null ? undefined : this.parseBigCondition(connection.availableIf))})
  }

  public parseItemTypes(itemTypes: UnparsedItemType[]): ItemType[] {
    return itemTypes.map(itemType => new ItemType(
      itemType.id,
      itemType.name
    ));
  }

  public parseItems(items: UnparsedItem[]): Item[] {
    return items.map(item => {return new Item(
      item.id,
      item.itemTypeID,
      item.count,
      item.availableIf == null ? undefined : this.parseBigCondition(item.availableIf)
    )});
  }

  public parseDrops(drops: UnparsedDrop[]): Drop[] {
    return drops.map(drop => {return {
      item: this.parseItems([drop.item])[0],
      chance: drop.chance,
    }})
  }

  public parseEnemies(enemies: UnparsedEnemy[]): Enemy[] {
    return enemies.map(enemy => {return new Enemy(
      enemy.id,
      enemy.name,
      enemy.souls,
      enemy.respawns,
      this.parseDrops(enemy.drops),
      enemy.availableIf == null ? undefined : this.parseBigCondition(enemy.availableIf)
    )})
  }

  public parseObjects(objects: UnparsedOtherObject[]): OtherObject[] {
    return objects.map(object => {return new OtherObject(
      object.id,
      object.name,
      object.availableIf == null ? undefined : this.parseBigCondition(object.availableIf)
    )});
  }

  public parseNPCs(npcs: UnparsedNPC[]): NPC[] {
    return npcs.map(npc => {return new NPC(
      npc.id,
      npc.name,
      this.parseShopItems(npc.shop),
      npc.availableIf == null ? undefined : this.parseBigCondition(npc.availableIf)
    )})
  }

  public parseShopItems(shop: UnparsedShopItem[]): ShopItem[] {
    return shop.map(shopItem => {return {
      item: this.parseItems([shopItem.item])[0],
      cost: shopItem.cost,
      count: shopItem.count
    }})
  }

  public parseBigCondition(condition: UnparsedBigCondition): BigCondition {
    return {
      grammar: condition.grammar,
      subConditions: this.parseAtomicConditions(condition.subConditions)
    }
  }

  public parseAtomicConditions(conditions: UnparsedAtomicCondition[]): AtomicCondition[] {
    return conditions.map(condition => {return {
      subjectType: this.parseSubjectType(condition.subjectType),
      subjectId: condition.subjectId,
      verb: this.parseVerb(condition.verb),
      abbreviation: condition.abbreviation
    }})
  }

  public parseSubjectType(type: string): ConditionSubjects {
    if (Object.values(ConditionSubjects).includes(type as ConditionSubjects)) {
      return type as ConditionSubjects
    }
    throw new Error('Illegal condition subject: ' + type)
  }

  public parseVerb(verb: string): ConditionVerb {
    if (Object.values(ConditionVerb).includes(verb as ConditionVerb)) {
      return verb as ConditionVerb
    }
    throw new Error('Illegal condition subject: ' + verb)
  }
}


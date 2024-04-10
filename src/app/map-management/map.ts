import {Area} from "./area";
import {Location} from "./location";
import {Connection} from "./connection";
import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {BigCondition} from "./bigCondition";
import {AtomicCondition} from "./atomicCondition";
import {ConditionSubjects} from "../condition-builder/ConditionSubjects";
import {ConditionVerb} from "../ConditionVerb";
import {Drop} from "./drop";
import {ShopItem} from "./ShopItem";
import {ItemType} from "./itemType";

export class Map {
  name: string
  areas: Area[]
  items: ItemType[]

  constructor(name: string, unparsedAreas: UnparsedArea[], itemTypes: ItemType[]) {
    this.name = name;
    this.areas = this.parseAreas(unparsedAreas);
    this.items = itemTypes;
  }

  private parseAreas(unparsedAreas: UnparsedArea[]): Area[] {
    return unparsedAreas.map(area => {
      return new Area(area.id, area.name, this.parseLocations(area.locations))
    });
  }

  private parseLocations(locations: UnparsedLocation[]): Location[] {
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

  private parseConnections(connections: UnparsedConnection[]): Connection[] {
    return connections.map(connection => {return new Connection(
      connection.id,
      connection.to,
     connection.if == null ? undefined : this.parseBigCondition(connection.if))})
  }

  private parseItems(items: UnparsedItem[]): Item[] {
    return items.map(item => {return new Item(
      item.id,
      item.itemTypeID,
      item.count,
      item.if == null ? undefined : this.parseBigCondition(item.if)
    )});
  }

  private parseDrops(drops: UnparsedDrop[]): Drop[] {
    return drops.map(drop => {return {
      item: this.parseItems([drop.item])[0],
      chance: drop.chance,
    }})
  }

  private parseEnemies(enemies: UnparsedEnemy[]): Enemy[] {
    return enemies.map(enemy => {return new Enemy(
      enemy.id,
      enemy.name,
      enemy.souls,
      enemy.respawns,
      this.parseDrops(enemy.drops),
      enemy.if == null ? undefined : this.parseBigCondition(enemy.if)
    )})
  }

  private parseObjects(objects: UnparsedOtherObject[]): OtherObject[] {
    return objects.map(object => {return {
      id: object.id,
      name: object.name,
      availableIf: object.if == null ? undefined : this.parseBigCondition(object.if)
    }})
  }

  private parseNPCs(npcs: UnparsedNPC[]): NPC[] {
    return npcs.map(npc => {return {
      id: npc.id,
      name: npc.name,
      shop: this.parseShopItems(npc.shop),
      availableIf: npc.if == null ? undefined : this.parseBigCondition(npc.if)
    }})
  }

  private parseShopItems(shop: UnparsedShopItem[]): ShopItem[] {
    return shop.map(shopItem => {return {
      item: this.parseItems([shopItem.item])[0],
      cost: shopItem.cost,
      count: shopItem.count
    }})
  }

  private parseBigCondition(condition: UnparsedBigCondition): BigCondition {
    return {
      grammar: condition.grammar,
      subConditions: this.parseAtomicConditions(condition.subConditions)
    }
  }

  private parseAtomicConditions(conditions: UnparsedAtomicCondition[]): AtomicCondition[] {
    return conditions.map(condition => {return {
      subjectType: this.parseSubjectType(condition.subjectType),
      subjectId: condition.subjectId,
      verb: this.parseVerb(condition.verb),
      abbreviation: condition.abbreviation
    }})
  }

  private parseSubjectType(type: string): ConditionSubjects {
    if (Object.values(ConditionSubjects).includes(type as ConditionSubjects)) {
      return type as ConditionSubjects
    }
    throw new Error('Illegal condition subject: ' + type)
  }

  private parseVerb(verb: string): ConditionVerb {
    if (Object.values(ConditionVerb).includes(verb as ConditionVerb)) {
      return verb as ConditionVerb
    }
    throw new Error('Illegal condition subject: ' + verb)
  }

  public toString(): string {
    return "MapClass named " + this.name
  }
}

interface UnparsedArea {
  id: number,
  name: string
  locations: UnparsedLocation[]
}

interface UnparsedLocation {
  id: number
  name: string
  connections: UnparsedConnection[]
  items: UnparsedItem[]
  enemies: UnparsedEnemy[]
  objects: UnparsedOtherObject[]
  npcs: NPC[]
}

interface UnparsedConnection {
  id: number
  to: number
  if?: UnparsedBigCondition
}

interface UnparsedItem {
  id: number
  itemTypeID: number
  count: number
  if?: UnparsedBigCondition
}

interface UnparsedDrop {
  item: UnparsedItem
  chance: number
}

interface UnparsedEnemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: UnparsedDrop[]
  if?: UnparsedBigCondition
}

interface UnparsedOtherObject {
  id: number
  name: string
  if?: UnparsedBigCondition
}

interface UnparsedNPC {
  id: number
  name: string
  shop: UnparsedShopItem[]
  if?: UnparsedBigCondition
}

interface UnparsedShopItem {
  item: UnparsedItem
  cost: number
  count: number
}

interface UnparsedBigCondition {
  grammar: string
  subConditions: UnparsedAtomicCondition[]
}

interface UnparsedAtomicCondition {
  subjectType: string
  subjectId: number
  verb: string
  abbreviation: string
}

import {Area} from "../model/area";
import {Location} from "../model/location";
import {Connection} from "../model/connection";
import {Item} from "../model/item";
import {Enemy} from "../model/enemy";
import {OtherObject} from "../model/otherObject";
import {NPC} from "../model/NPC";
import {BigCondition} from "../model/bigCondition";
import {AtomicCondition} from "../model/atomicCondition";
import {ConditionSubjects} from "../builders/condition-builder/ConditionSubjects";
import {ConditionVerb} from "../model/ConditionVerb";
import {Drop} from "../model/drop";
import {ShopItem} from "../model/ShopItem";
import {ItemType} from "../model/itemType";

export class Map {
  name: string
  areas: Area[]
  items: ItemType[]

  constructor(name: string, unparsedAreas: UnparsedArea[], itemTypes: ItemType[]) {
    this.name = name;
    this.areas = this.parseAreas(unparsedAreas);
    this.items = this.parseItemTypes(itemTypes);
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
     connection.availableIf == null ? undefined : this.parseBigCondition(connection.availableIf))})
  }

  private parseItemTypes(itemTypes: UnparsedItemType[]): ItemType[] {
    return itemTypes.map(itemType => new ItemType(
      itemType.id,
      itemType.name
    ));
  }

  private parseItems(items: UnparsedItem[]): Item[] {
    return items.map(item => {return new Item(
      item.id,
      item.itemTypeID,
      item.count,
      item.availableIf == null ? undefined : this.parseBigCondition(item.availableIf)
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
      enemy.availableIf == null ? undefined : this.parseBigCondition(enemy.availableIf)
    )})
  }

  private parseObjects(objects: UnparsedOtherObject[]): OtherObject[] {
    return objects.map(object => {return new OtherObject(
      object.id,
      object.name,
      object.availableIf == null ? undefined : this.parseBigCondition(object.availableIf)
    )});
  }

  private parseNPCs(npcs: UnparsedNPC[]): NPC[] {
    return npcs.map(npc => {return new NPC(
      npc.id,
      npc.name,
      this.parseShopItems(npc.shop),
      npc.availableIf == null ? undefined : this.parseBigCondition(npc.availableIf)
    )})
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
  availableIf?: UnparsedBigCondition
}

interface UnparsedItem {
  id: number
  itemTypeID: number
  count: number
  availableIf?: UnparsedBigCondition
}

interface UnparsedItemType {
  id: number
  name: string
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
  availableIf?: UnparsedBigCondition
}

interface UnparsedOtherObject {
  id: number
  name: string
  availableIf?: UnparsedBigCondition
}

interface UnparsedNPC {
  id: number
  name: string
  shop: UnparsedShopItem[]
  availableIf?: UnparsedBigCondition
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

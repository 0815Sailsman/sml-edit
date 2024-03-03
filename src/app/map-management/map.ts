import {MajorLocation} from "./majorLocation";
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

export class Map {
  name: string
  locations: MajorLocation[]

  constructor(name: string, locations: UnparsedMajorLocation[]) {
    this.name = name;
    this.locations = this.parseMajorLocations(locations);
  }

  private parseMajorLocations(locations: UnparsedMajorLocation[]): MajorLocation[] {
    return locations.map(location => {return {
      id: location.id,
      name: location.name,
      subLocations: this.parseMinorLocations(location.subLocations)
    }})
  }

  private parseMinorLocations(locations: UnparsedLocation[]): Location[] {
    return locations.map(location => {return {
      id: location.id,
      name: location.name,
      connections: this.parseConnections(location.connections),
      items: this.parseItems(location.items),
      enemies: this.parseEnemies(location.enemies),
      objects: this.parseObjects(location.objects),
      npcs: location.npcs
    }})
  }

  private parseConnections(connections: UnparsedConnection[]): Connection[] {
    return connections.map(connection => {return {
      to: connection.to,
      if: this.parseBigCondition(connection.if)
    }})
  }

  private parseItems(items: UnparsedItem[]): Item[] {
    return items.map(item => {return {
      id: item.id,
      name: item.name,
      count: item.count,
      if: item.if == null ? undefined : this.parseBigCondition(item.if)
    }})
  }

  private parseEnemies(enemies: UnparsedEnemy[]): Enemy[] {
    return enemies.map(enemy => {return {
      id: enemy.id,
      name: enemy.name,
      souls: enemy.souls,
      respawns: enemy.respawns,
      drops: this.parseItems(enemy.drops),
      spawnsIf: enemy.spawnsIf == null ? undefined : this.parseBigCondition(enemy.spawnsIf)
    }})
  }

  private parseObjects(objects: UnparsedOtherObject[]): OtherObject[] {
    return objects.map(object => {return {
      id: object.id,
      name: object.name,
      if: object.if == null ? undefined : this.parseBigCondition(object.if)
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
      verb: this.parseVerb(condition.verb)
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

interface UnparsedMajorLocation {
  id: number,
  name: string
  subLocations: UnparsedLocation[]
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
  to: number
  if: UnparsedBigCondition
}

interface UnparsedItem {
  id: number
  name: string
  count: number
  if?: UnparsedBigCondition
}

interface UnparsedEnemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: UnparsedItem[]
  spawnsIf?: UnparsedBigCondition
}

interface UnparsedOtherObject {
  id: number
  name: string
  if?: UnparsedBigCondition
}

interface UnparsedBigCondition {
  grammar: string
  subConditions: UnparsedAtomicCondition[]
}

interface UnparsedAtomicCondition {
  subjectType: string
  subjectId: number
  verb: string
}

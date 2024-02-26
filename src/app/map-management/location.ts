import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {Connection} from "./connection";

export interface Location {
  id: number
  name: string
  connections: Connection[]
  items: Item[]
  enemies: Enemy[]
  objects: OtherObject[]
  npcs: NPC[]
  visited: boolean
}

export function locationToString(location: Location | undefined): string {
  if (location == undefined) {
    return "undefined"
  }
  return location.name
}

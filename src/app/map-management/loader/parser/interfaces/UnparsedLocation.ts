import {UnparsedConnection} from "./UnparsedConnection";
import {UnparsedItem} from "./UnparsedItem";
import {UnparsedEnemy} from "./UnparsedEnemy";
import {UnparsedOtherObject} from "./UnparsedOtherObject";
import {NPC} from "../../../../model/NPC";
import {UnparsedNPC} from "./UnparsedNPC";

export interface UnparsedLocation {
  id: number
  name: string
  connections: UnparsedConnection[]
  items: UnparsedItem[]
  enemies: UnparsedEnemy[]
  objects: UnparsedOtherObject[]
  npcs: UnparsedNPC[]
}

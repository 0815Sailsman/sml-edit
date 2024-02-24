import {ItemInterface} from "./item.interface";
import {EnemyInterface} from "./enemy.interface";
import {OtherObjectInterface} from "./otherObject.interface";
import {NpcInterface} from "./npc.interface";
import {ConnectionInterface} from "./connection.interface";

export interface LocationInterface {
  id: number
  name: string
  connections: ConnectionInterface[]
  items: ItemInterface[]
  enemies: EnemyInterface[]
  objects: OtherObjectInterface[]
  npcs: NpcInterface[]
  visited: boolean
}

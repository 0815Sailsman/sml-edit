import {Item} from "./item";
import {BigCondition} from "./bigCondition";

export interface Enemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: Item[]
  if?: BigCondition
}

export function enemyToString(enemy: Enemy | undefined): string {
  if (enemy == undefined) {
    return "undefined"
  }
  return enemy.name;
}

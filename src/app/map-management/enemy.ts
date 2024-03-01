import {Item} from "./item";
import {BigCondition} from "./bigCondition";

export interface Enemy {
  name: string
  souls: number
  respawns: boolean
  drops: Item[]
  spawnsIf?: BigCondition
}

export function enemyToString(enemy: Enemy | undefined): string {
  if (enemy == undefined) {
    return "undefined"
  }
  return enemy.name;
}

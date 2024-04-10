import {Item} from "./item";
import {BigCondition} from "./bigCondition";
import {Drop} from "./drop";

export interface Enemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: Drop[]
  availableIf?: BigCondition
}

export function enemyToString(enemy: Enemy | undefined): string {
  if (enemy == undefined) {
    return "undefined"
  }
  return enemy.name;
}

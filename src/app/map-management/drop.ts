import {Item} from "./item";

export interface Drop {
  item: Item
  chance: number
}

export function dropToString(drop: Drop | undefined): string {
  if (drop == undefined) {
    return "undefined"
  }
  return drop.item.name + " with " + drop.chance + "%";
}

import {BigCondition} from "./bigCondition";

export interface Item {
  id: number
  name: string
  count: number
  if?: BigCondition
}

export function itemToString(item: Item | undefined): string {
  if (item == undefined) {
    return "undefined"
  }
  return item.name;
}

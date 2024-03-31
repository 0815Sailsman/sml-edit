import {BigCondition} from "./bigCondition";

export interface Item {
  id: number
  itemTypeID: number
  count: number
  if?: BigCondition
}

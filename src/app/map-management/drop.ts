import {Item} from "./item";

// to simplify this, we say a enemy can only have 1 drop of 1 itemtype
// => drop.id is equal to item.id
export interface Drop {
  item: Item
  chance: number
}

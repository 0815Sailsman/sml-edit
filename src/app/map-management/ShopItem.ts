import {BigCondition} from "./bigCondition";
import {Item} from "./item";

export interface ShopItem {
  item: Item
  cost: number
  count: number
}

export function shopItemToString(shopItem: ShopItem | undefined): string {
  if (shopItem == undefined) {
    return "undefined"
  }
  return shopItem.item.name
}

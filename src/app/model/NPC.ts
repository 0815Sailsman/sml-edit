import {BigCondition} from "./bigCondition";
import {ShopItem} from "./ShopItem";

export class NPC {
  id: number
  name: string
  shop: ShopItem[]
  availableIf?: BigCondition

  constructor(
    id: number,
    name: string,
    shop: ShopItem[],
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.name = name;
    this.shop = shop;
    this.availableIf = availableIf;
  }

  toString(): string {
    return this.name + " (ID: " + this.id + ")";
  }
}

import {BigCondition} from "./bigCondition";
import {ShopItem} from "./ShopItem";

export interface NPC {
  id: number
  name: string
  shop: ShopItem[]
  if?: BigCondition
}

export function npcToString(npc: NPC | undefined): string {
  if (npc == undefined) {
    return "undefined"
  }
  return npc.name
}

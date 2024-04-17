import {NPC} from "../../model/NPC";
import {type ShopItem} from "../../model/ShopItem";

export function anNPCSelling(shop: ShopItem[]=[]): NPC {
  return new NPC(0, "npc0", shop);
}

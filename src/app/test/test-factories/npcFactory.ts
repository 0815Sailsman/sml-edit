import {NPC} from "../../model/NPC";
import {type ShopItem} from "../../model/ShopItem";

export function anNPC(): NPC {
  return new NPC(0, "npc0", []);
}

export function anotherNPC(): NPC {
  return new NPC(1, "npc1", []);
}

export function anNPCSelling(shop: ShopItem[]=[]): NPC {
  return new NPC(0, "npc0", shop);
}

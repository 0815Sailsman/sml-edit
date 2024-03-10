import {BigCondition} from "./bigCondition";

export interface NPC {
  id: number
  name: string
  if?: BigCondition
}

export function npcToString(npc: NPC | undefined): string {
  if (npc == undefined) {
    return "undefined"
  }
  return npc.name
}

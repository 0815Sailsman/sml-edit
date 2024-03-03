export interface NPC {
  id: number
  name: string
}

export function npcToString(npc: NPC | undefined): string {
  if (npc == undefined) {
    return "undefined"
  }
  return npc.name
}

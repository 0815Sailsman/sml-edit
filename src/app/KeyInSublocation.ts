export enum KeyInSublocation {
  Items = "items",
  Connections = "connections",
  Enemies = "enemies",
  Npcs = "npcs",
  Objects = "objects"
}

export function nameOf(key: KeyInSublocation): string {
  switch (key) {
    case KeyInSublocation.Connections: return "Connections"
    case KeyInSublocation.Items: return "Items"
    case KeyInSublocation.Enemies: return "Enemies"
    case KeyInSublocation.Objects: return "Objects"
    case KeyInSublocation.Npcs: return "Npcs"
  }
}

export enum KeyInLocation {
  Items = "items",
  Connections = "connections",
  Enemies = "enemies",
  Npcs = "npcs",
  Objects = "objects"
}

export function nameOf(key: KeyInLocation): string {
  switch (key) {
    case KeyInLocation.Connections: return "Connections"
    case KeyInLocation.Items: return "Items"
    case KeyInLocation.Enemies: return "Enemies"
    case KeyInLocation.Objects: return "Objects"
    case KeyInLocation.Npcs: return "Npcs"
  }
}
